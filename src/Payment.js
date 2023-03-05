import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import {Link, useNavigate} from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import axios from 'axios';
import { db } from './firebase';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const history = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            console.log({"Basket Total": getBasketTotal(basket)})
            const response = await axios({
                method:'post',
                url:`http://localhost:5000/payments/create?total=${getBasketTotal(basket)}`
            });

            console.log(response.data);
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log("The SECRET is >>>", clientSecret);

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            db
                .collection('users')
                .doc(user.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.created,
                    created: paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch ({
                type: 'EMPTY_BASKET'
            })

            history('/orders', {replace:true})

        })
    }
    
    const handleChange = event => {
        // Listen for changes in the CardElement 
        // & Display any errors as the customer types their card
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                {/* Payment section - Delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>457 React Lane</p>
                        <p>San Diego, CA-92115</p>
                    </div>
                </div>

                {/* Payment section - Review items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment Method */}
                <div className='payment__section'>
                    <div className='payment__tille'>
                        <h3>
                            Payment Method
                        </h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe magic will go here  */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <h3>Order Total: ${getBasketTotal(basket)}</h3>
                                <button disbaled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>


                        </form>
                    </div>

                </div>          
            </div>
            
        </div>
    )
}

export default Payment;

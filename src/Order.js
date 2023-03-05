
// import moment from 'moment';
import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Order.css';
import { getBasketTotal } from './reducer';
// import { useStateValue } from './StateProvider';

// const [{ basket }] = useStateValue();
function Order({ order }) {
  return (
    <div className='order'>
        <h2>Order</h2>
        {/* <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p> */}
        <p className="order__id">
            <small>{order.id}</small>
        </p>
        {order.data.basket.map(item => (
            <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
            />
        ))}

        <h3 className='order__total'>Order Total: $ <strong>{getBasketTotal(order.data.basket)}</strong></h3>
    </div>
  )
}

export default Order
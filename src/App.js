import React, { useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes }
from "react-router-dom";
import Checkout from "./Checkout";
import Payment from './Payment';
import Orders from './Orders';
import { auth } from './firebase';
import{ useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51Lqvz9KfzsngvCFERFuBFxfxpw4m8NqfNxU74v0KwkjRTPxtoAYvdSnXoc3hdBFrldbCW135MnX3COloJpraQUY500y823jsdc");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads...

    auth.onAuthStateChanged(authUser => {
      console.log('The USER IS >>>>', authUser);
      
      if(authUser) {
        //the user just logged in / the user was logged in

        //fire off the event and shoot the user in the data layer
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        //The user is logged out
        dispatch({
          type:"SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (

    <Router>
        <div className="app">

          
          
          <Routes>

            <Route path="/orders" element={<>  <Header/> <Orders />  </>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/checkout" element={<>  <Header/> <Checkout />  </>}/>
            <Route path="/payment" element={<>  <Header/> <Elements stripe={promise}> <Payment />  </Elements></>}/>
            <Route path="/" element={<>  <Header/>  <Home/>  </>} />
            
          </Routes>
          
        </div>
    </Router>
    
  );
}

export default App;

import React from 'react';
import "./Home.css";
import Product from "./Product";


function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img 
                className='home__image'
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                alt=" "
                />
            

                <div className="home__row">
                    <Product 
                            id="123"
                            title='The Lean Startup:How Constant Innovation Creates Radically Successful Businesses Paperback' 
                            price={29.99} 
                            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
                            rating={5}
                    />
                    <Product 
                            id="1234"
                            title='The Lean Startup:How Constant Innovation Creates Radically Successful Businesses Paperback' 
                            price={29.99} 
                            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
                            rating={3}
                    />                
                </div>

                <div className="home__row">
                    <Product 
                            id="12345"
                            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                            price={748.99}
                            rating={3}
                            image={"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"}
                    />
                    <Product 
                            id="12"
                            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                            price={98.99}
                            rating={5}
                            image={"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"}
                    />                     
                    
                    <Product 
                            id="123456"

                            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                            price={5888.99}
                            rating={4}
                            image={"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"}
                    />
                </div>

                <div className="home__row">
                    <Product 
                            id="1234567"
                            title='The Lean Startup:How Constant Innovation Creates Radically Successful Businesses Paperback' 
                            price={29.99} 
                            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
                            rating={2}
                    />                
                </div>
            </div>
        </div>
    )
}

export default Home

const port = process.env.PORT||5000;
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51Lqvz9KfzsngvCFEJKc0mMFy3SjBskUNAq69ClqRiMZkqGW4zICH3q9DAYgTYjRzjh0hwh8okRAjeUuGcS65DcnH00sXWzly7Z");
stripe.customers.create({
    email: 'customer@example.com',
  })
    .then(customer => console.log(customer.id))
    .catch(error => console.error(error));

// API

// - API config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  try{
    console.log("Payment Recieved for this amount >>>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total*100),
    currency: "usd",
  });

  // OK created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
  } catch(e) {
    console.log("error", e.message);
    response.status(400);
  }
  
})
// - Listen command
// exports.api = functions.https.onRequest(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


// Example endpoint
// http://localhost:5001/app-clone-ca980/us-central1/api


const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("sk_test_51NjOrHHGPo1tmSJDHDjX1B9DzUsJswZ4cHf6gCnBl08DnPgPH27MPZsDLxxB7gsaauppzPr0uxlou6vPTT47q7L200lqnwIKRq");

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
           line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.productName,
                images: [item.imageUrl]
              },
              unit_amount:  item.price * 100,
            },
            quantity: item.quantity,
          })),
           mode: "payment",
           success_url: "http://localhost:4243/success.html",
           cancel_url: "http://localhost:4243/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4243, () => console.log('app is running on 4242'));
require('../DATA/database');
var express = require('express');
var router = express.Router();
const cartModel = require("../MODELS/cart");

router.post('/', async (req, res) => {
    try {
        const isCart = await cartModel.findOne({ userId: req.body.userId });
        if (isCart) {
            res.send(isCart)
            return;
        }
        const cart = new cartModel({
            userId: req.body.userId,
            items: [],
            totalQty: 0,
            totalPrice: 0
        })
        await cart.save()
        res.status(200).send(cart)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/get-cart/:id', (req, res) => {
    cartModel.findOne({ userId: req.params.id }, (err, userCart) => {
        err ? res.status(500).send(err) : res.status(200).send(userCart)
    });
})

router.put('/add-to-cart', async (req, res) => {
    console.log(req.body)
    try {
        const cart = await cartModel.findOne({ userId: req.body.userId });
        const isItemInCart = cart.items.find(item => item._id == req.body.items[0]._id);

        const length = cart.totalQty;
        const priceToAdd = req.body.items[0].price;

        let updatedCart;
        if (isItemInCart) {
            const items = cart.items.map(item => {
                if (item._id == req.body.items[0]._id) {
                    return {
                        ...item,
                        amount: item.amount++,
                    }
                }
                return item;
            });
            updatedCart = await cartModel.findOneAndUpdate(
                { userId: req.body.userId },
                {
                    $set: { totalPrice: Number(priceToAdd) + Number(cart.totalPrice), totalQty: 1 + length, items },
                },
                { new: true }
            );
        }
        else {
            updatedCart = await cartModel.findOneAndUpdate(
                { userId: req.body.userId },
                {
                    $set: { totalPrice: Number(priceToAdd) + Number(cart.totalPrice), totalQty: 1 + length },
                    $push: { items: req.body.items }
                },
                { new: true }
            );
        }
        res.status(200).send(updatedCart)
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
});

router.post('/remove-item', async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.body.userId });
        const itemToDelete = cart.items.find(item => item._id == req.body.itemId);
        const cartNewItems = cart.items.filter(item => item._id != req.body.itemId);

        const priceToReduce = itemToDelete.price * itemToDelete.amount;
        console.log(priceToReduce)
        console.log('cartNewItems', cartNewItems)
        const length = cart.totalQty;
        console.log(itemToDelete)

        const updItemsArr = await cartModel.findOneAndUpdate(
            { userId: req.body.userId },
            {
                $set: { items: cartNewItems, totalPrice: cart.totalPrice - priceToReduce, totalQty: Number(length) - Number(itemToDelete.amount) }
            },
            { new: true }
        );
        res.status(200).send(updItemsArr)
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
});

router.post('/reduce-one-item', async (req, res) => {
    try {
        const { itemId, price, userId } = req.body;
        
        const cart = await cartModel.findOne({ userId: req.body.userId });
        const length = cart.totalQty;

        const cartNewItems = cart.items.map(item => {
            if (item._id == itemId) {
                return {
                    ...item,
                    amount: item.amount--,
                };
            }
            return item;
        });

        const updItemsArr = await cartModel.findOneAndUpdate(
            { userId },
            {
                $set: { items: cartNewItems, totalPrice: cart.totalPrice - price, totalQty: Number(length) - 1 }
            },
            { new: true }
        );
        res.status(200).send(updItemsArr);
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

module.exports = router;
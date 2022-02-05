import express from 'express';
import db from '../db/db.js'

const router = express.Router();

router.get('/user/:id', async (req, res) => {
	console.log("Get user req: ", req.params.id)
	const customer = await db.getCustomer(req.params.id)
	console.log("Successfully get user ", customer)
	res.status(200).json(customer)
})

router.post('/user', async (req, res) => {
	console.log("Add user req: ", req.body)
	await db.insertCustomer(req.body)
	console.log("Successfully added user")
	res.status(200).json({})
})

router.get('/purchase/:id', async (req, res) => {
	console.log("Get purchase req: ", req.params.id)
	const purchase = await db.getPurchase(req.params.id)
	console.log("Successfully get purchase ", purchase)
	res.status(200).json(purchase)
})

router.get('/purchase/:id/products', async (req, res) => {
	console.log("Get purchase req: ", req.params.id)
	const products = await db.getProductsFromPurchaseId(req.params.id)
	console.log("Successfully get products from purchase id", products)
	res.status(200).json(products)
})

router.post('/purchase', async (req, res) => {
	console.log("Add purchase req: ", req.body)
	await db.insertPurchase(req.body)
	console.log("Successfully added purchase")
	res.status(200).json({})
})

router.get('/product/:id', async (req, res) => {
	console.log("Get product req: ", req.params.id)
	const purchase = await db.getProduct(req.params.id)
	console.log("Successfully get product ", purchase)
	res.status(200).json(purchase)
})

router.post('/product', async (req, res) => {
	console.log("Add product req: ", req.body)
	await db.insertProduct(req.body)
	console.log("Successfully added product")
	res.status(200).json({})
})

export default router;

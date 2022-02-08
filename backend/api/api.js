import express from 'express';
import db from '../db/db.js'
import fuzzysort from 'fuzzysort';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
	console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.email = data.email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get('/user', authenticateJWT, async (req, res) => {
	// req will have an email
	const email = req.email;
	const customer = await db.getCustomerByEmail(email);
	console.log("Successfully get user ", customer);
	res.status(200).json(customer[0]);
})

router.post('/signup', async (req, res) => {
	console.log("Add user req: ", req.body);
	const pass = req.body.password;
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(pass, salt);

	const customer = {
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		password_hash: passwordHash
	}
	await db.insertCustomer(customer);

	// login and return access/refresh tokens
	const accessToken = jwt.sign({email: req.body.email}, accessTokenSecret, { expiresIn: '20m' });
	const refreshToken = jwt.sign({email: req.body.email}, refreshTokenSecret, { expiresIn: '30d' });
	res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
	console.log("Successfully added user");
	return;
})

router.post('/login', async (req, res) => {
	console.log("Log in request: ", req.body);
	const email = req.body.email;
	const password = req.body.password;

	const customer = await db.getCustomerByEmail(email);
	if (customer.length === 0) {
		res.status(200).json({res: "no_such_user"});
		return;
	}
	const validPassword = await bcrypt.compare(password, customer[0].password_hash);
	if (validPassword) {
        const accessToken = jwt.sign({email: email}, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({email: email}, refreshTokenSecret, { expiresIn: '30d' });
		res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, customerId: customer[0].id});
		return;
	} else {
		res.status(200).json({res: "wrong_password"});
		return;		
	}
})

router.post('/token', async (req, res) => {
	console.log("Get access token using refresh token req: ", req.body);
	const token  = req.body.accessToken;

    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, refreshTokenSecret, (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({email: data.email}, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken: accessToken
        });
		return;
    });
	res.json({})
})

router.get('/purchase', authenticateJWT, async (req, res) => {

	const email = req.email;
	const customer = await db.getCustomerByEmail(email);

	console.log("Get purchase req: ", req.params.id);
	const purchase = await db.getPurchaseByCustomerId(customer.id);
	console.log("Successfully get purchase ", purchase);
	res.status(200).json(purchase);
})

router.get('/purchase/:id/products', async (req, res) => {
	console.log("Get purchase req: ", req.params.id);
	let products = await db.getProductsFromPurchaseId(req.params.id);

	products = await Promise.all(products.map(async (product) => {
		const images = await db.getProductImages(product.id);
		product.images = images;
		console.log(product);
		return product;
	}))
	console.log("Successfully get products from purchase id", products);
	res.status(200).json(products);
})

router.post('/purchase', async (req, res) => {
	console.log("Add purchase req: ", req.body);
	await db.insertPurchase(req.body.purchase);

	await db.updateProductWithPurchaseId(req.body.productIds);
	console.log("Successfully added purchase");
	res.status(200).json({});
})

router.get('/product/search', async (req, res) => {
	console.log("Search product query: ", req.query);
	
	let products = await db.getProducts()
	const is_new = req.query.is_new;
	if (is_new) {
		products = products.filter((product)=> product.is_new);
	}
	const is_featured = req.query.is_featured ;
	if (is_featured) {
		products = products.filter((product)=> product.is_featured);
	}
	const price_order = req.query.price_order;

	if (price_order === "asc") {
		products.sort((a, b) => a.price - b.price);
	} else if (price_order === "desc") {
		products.sort((a, b) => b.price - a.price);
	}
	const date_order = req.query.date_order;
	if (date_order === "asc") {
		products.sort((a, b) => a.created_at - b.created_at);
	} else if (date_order === "desc") {
		products.sort((a, b) => b.created_at - a.created_at);
	}

	const fuzzy = req.query.fuzzy;
	if (fuzzy) {
		const results = fuzzysort.go(fuzzy, products, {key: 'name'});
		products = results.map((result) => result.obj)
	}

	products = await Promise.all(products.map(async (product) => {
		const images = await db.getProductImages(product.id);
		product.images = images;
		console.log(product);
		return product;
	}))

	res.status(200).json(products);
})


router.get('/product/:id', async (req, res) => {
	console.log("Get product req: ", req.params.id);
	const product = await db.getProduct(req.params.id);
	if (product.length === 0) {
		res.status(200).json({});
	}
	if (product.length !== 1) {
		console.log('WARNING: results is more than 1');
	}
	const images = await db.getProductImages(product[0].id);
	product[0].images = images;
	console.log("Successfully get product ", product);
	res.status(200).json(product[0]);
})

router.post('/product', async (req, res) => {
	console.log("Add product req: ", req.body);
	await db.insertProduct(req.body);
	console.log("Successfully added product");
	res.status(200).json({});
})

export default router;

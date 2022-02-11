import pg from 'pg'


// connect to db
const Pool = pg.Pool
const pool = new Pool({
    host: 'localhost',
    database: 'spruce',
    port: 5432,
})


const db = {
    //============================================ CUSTOMER ================================================//
    getCustomer: async (id) => {
        const result = await pool.query('SELECT * FROM customer WHERE id = ($1)', [id])
        return result.rows
    },
    getCustomerByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM customer WHERE email = ($1) LIMIT 1', [email]);
        return result.rows;
    },
    insertCustomer: async (customer) => {
        await pool.query('INSERT INTO customer (name, email, address, password_hash) VALUES ($1, $2, $3, $4)', [customer.name, customer.email, customer.address, customer.password_hash])
    },
    //============================================ PURCHASE ================================================//
    getPurchasesByCustomerId: async (id) => {
        const result = await pool.query('SELECT * FROM purchase WHERE customer_id = ($1) ', [id])
        return result.rows
    },
    insertPurchase: async (purchase) => {
        const res = await pool.query('INSERT INTO purchase (customer_id, created_at, mail_date, total_amount) VALUES ($1, $2, $3, $4) RETURNING id',
            [purchase.customer_id, purchase.created_at, purchase.mail_date, purchase.total_amount])
        return res.rows[0].id
    },
    updateProductWithPurchaseId: async (purchase_id, product_id) => {
        await pool.query('UPDATE product SET purchase_id = ($1) WHERE id = ($2)', [purchase_id, product_id])
    }, 
    //============================================ PRODUCT ================================================//
    getProduct: async (id) => {
        const result = await pool.query('SELECT * FROM product WHERE product.id = ($1)', [id])
        return result.rows
    },
    getProductImages: async (product_id) => {
        const result = await pool.query('SELECT * FROM image WHERE product_id = ($1)', [product_id])
        return result.rows
    },
    getProductsFromPurchaseId: async (purchase_id) => {
        const result = await pool.query('SELECT * FROM product WHERE purchase_id = ($1)', [purchase_id])
        return result.rows
    },
    insertProduct: async (product) => {
        const res = await pool.query('INSERT INTO product (name, price, description, created_at, size, purchase_id, is_featured, is_new) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            [product.name, product.price, product.description, product.created_at, product.size, product.purchase_id, product.is_featured, product.is_new])
        return res.rows[0].id;
    },
    getProducts: async () => {
        const result = await pool.query('SELECT * FROM product')
        return result.rows
    },
    insertProductImages: async (image) => {
        await pool.query('INSERT INTO image (url, product_id) VALUES ($1, $2)', [image.url, image.product_id]);
    }
    //=====================================================================================================//
}

export default db;
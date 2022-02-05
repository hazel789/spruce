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
    insertCustomer: async (customer) => {
        await pool.query('INSERT INTO customer (name, email, address) VALUES ($1, $2, $3)', [customer.name, customer.email, customer.address])
    },
    //============================================ PURCHASE ================================================//
    getPurchase: async (id) => {
        const result = await pool.query('SELECT * FROM purchase WHERE id = ($1)', [id])
        return result.rows
    },
    insertPurchase: async (purchase) => {
        await pool.query('INSERT INTO purchase (customer_id, product_id, created_at, mail_date, total_amount) VALUES ($1, $2, $3, $4, $5)',
            [purchase.customer_id, purchase.product_id, purchase.created_at, purchase.mail_date, purchase.total_amount])
    },
    //============================================ PRODUCT ================================================//
    getProduct: async (id) => {
        const result = await pool.query('SELECT * FROM product WHERE id = ($1)', [id])
        return result.rows
    },
    getProductsFromPurchaseId: async (purchase_id) => {
        const result = await pool.query('SELECT * FROM product WHERE purchase_id = ($1)', [purchase_id])
        return result.rows
    },
    insertProduct: async (product) => {
        await pool.query('INSERT INTO product (name, images, price, description, created_at, size, purchase_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [product.name, product.images, product.price, product.description, product.created_at, product.size, product.purchase_id])
    },
    //=====================================================================================================//
}

export default db;
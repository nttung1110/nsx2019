require('dotenv').config()
const express = require('express')
const app = express()
const pg = require('pg')
const port = 4000

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

const pool = new pg.Pool(config)
var obj = {}

app.use(express.static(__dirname + '/assets'))

app.set('view engine', 'ejs') 

app.get('/', (req,res) => {
    res.render('home', {
        links: [
            {
                href: '/farms',
                text: 'Farms infomation'
            },
            {
                href: '/products',
                text:'Products infomation'
            },
            {
                href: '/categories',
                text:'Categories'
            },
            {
                href: '/customers',
                text:'Customers infomation'
            }
        ]
    })
})

app.get('/categories', (req,res,next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM categories', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
             }
             res.render('index', {cates: result.rows})
        })
    })
})

app.get('/farms', (req,res,next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT farms.id, farms.name, farms.owner, farms.address, products.name as prodname, farms.product_id, farms.phone from farms, products where products.id = farms.product_id', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
             }
             res.render('farms', {
                 farms: result.rows
                })
           
        })
    })
})

app.get('/products', (req,res,next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT products.id, products.name, products.amount, products.price, products.description, products.brand_id, products.category_id, categories.name as catename FROM products, categories where products.category_id=categories.id', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
             }
             res.render('prod', {prods: result.rows})
        })
    })
})

app.get('/products/:id', (req, res, nect) => {
    let sql = `select * from products where id= ${req.params.id}`
    pool.connect(function (err, client, done){
        if (err){
            console.log('Can not connect to the DB' + err)
        }
        client.query(sql, function(err,result){
            done()
            if (err){
                return res.render('error', {
                    message: 'Something went wrong !!!'
                })
            }
            res.render('prod', {prods: result.rows})
        })
    })
})

app.get('/customers', (req,res,next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM customers', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
             }
             res.render('customers', {cus: result.rows})
        })
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
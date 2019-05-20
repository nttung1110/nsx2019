const express = require('express')
const app = express()
const pg = require('pg')
const port = 4000

const config = {
    user: 'postgres',
    database: 'nsx',
    password: 'postgre',
    port: 5432
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
        client.query('SELECT * FROM farms', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
             }
             res.render('farms', {farms: result.rows})
        })
    })
})

app.get('/products', (req,res,next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM products', function (err, result) {
             done()
             if (err) {
                 console.log(err)
                 res.status(400).send(err)
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
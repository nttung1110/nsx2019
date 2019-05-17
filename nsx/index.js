const express = require('express')
const app = express()
const port = 4000

app.set('view engine', 'ejs') 

app.get('/api/getList', (req, res) => res.json('Hiihihihi'))

app.get('/', (req, res) => {
    res.render('index', {
        user: {
            name: 'An'
        },
        users: ['apple', 'samsung', 'sony']
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
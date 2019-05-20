const express = require('express')
const app = express()
const port = 4000
var fs = require('fs');

app.use(express.static(__dirname + '/assets'))

app.set('view engine', 'ejs') 

app.get('/api/getList', (req, res) => {
    res.json({
        user: [
            {
                name: 'Quoc An',
                class: 'PQ-WEB-D002'
            },
            {
                name: 'Mai Quynh Anh',
                class: 'PQ-WEB-D002'
            },
            {
                name: 'Huynh Man Dat',
                class: 'PQ-WEB-D002'
            },
            {
                name: 'Duong Le Vinh',
                class: 'PQ-WEB-D002'
            },
            {
                name: 'Dao Duy Man',
                class: 'PQ-WEB-D002'
            },
            {
                name: 'Thien Canh Giam',
                class: 'PQ-WEB-D002'
            }]
    })
})

app.get('/', (req, res) => {
    res.render('index', {
        user: [
        {
            name: 'Quoc An',
            class: 'PQ-WEB-D002'
        },
        {
            name: 'Mai Quynh Anh',
            class: 'PQ-WEB-D002'
        },
        {
            name: 'Tuan Anh',
            class: 'PQ-WEB-D002'
        },
        {
            name: 'Dao Duy Tu',
            class: 'PQ-WEB-D002'
        },
        {
            name: 'Mai Duy Anh',
            class: 'PQ-WEB-D002'
        },
        {
            name: 'Thien Canh Giam',
            class: 'PQ-WEB-D002'
        }]
        
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.static('public'))
app.set('view engine', 'ejs');
var pgp = require('pg-promise')( /* options */ )
var db = pgp('postgres://postgres:password@localhost:5432/tablename');



app.get('/', (req, res) => {
    res.render('teacher')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
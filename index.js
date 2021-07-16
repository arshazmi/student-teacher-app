const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.static('public'))
app.set('view engine', 'ejs');
var pgp = require('pg-promise')( /* options */ )
var db = pgp('postgres://postgres:root@localhost:5432/studteach');

app.get('/', (req, res) => {
    res.render('teacher')
})
//techer read operation
app.get('/teacher/select', async (req, res) => {
    await db.any('select * from teacher').then(datan => {
        console.log(data);
        var data = {
            'status': "Valid",
            "data": datan
        };
        res.status(200).json(data);
    }).catch(error => {
        console.log(error);
        var data = {
            'status': "invalid",
            "msg": error
        };
        res.status(200).json(data);
    });
})
//teacher create operation
app.post('/teacher/select/post', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    if (req.body.id === '') {
        await db.none('INSERT INTO teacher(name,course) VALUES(  ${name},${course})', { 
            name: req.body.name,
            course: req.body.course
        });

    } else {
        await db.none('update teacher set  name=${name}, course=${course} where id = ${id}', {
            name: req.body.name,
            course: req.body.course,
            id: req.body.id
        })
    }
    // var data = {
    //     'status': "Valid",
    //     'status-code': "5001",
    // };
    // res.status(200).json(data);
})

app.get('/teacher/select/edit/:id', async (req, res) => {
    console.log(req.params.id);
    await db.any('select * from teacher where id  =' + req.params.id).then(datan => {
        var data = {
            'status': "Valid",
            'status-code': "5001",
            "data": datan
        };
        res.status(200).json(data);
    }).catch(error => {
        console.log(error);
        var data = {
            'status': "invalid",
            'status-code': "5000",
            "msg": error
        };
        res.status(200).json(data);
    });
})

app.get('/teacher/selectapi/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await db.none('delete from teacher where id = ${id}', {
        id: req.params.id
    })
    var data = {
        'status': "Valid",
        'status-code': "5001", 
    };
    res.status(200).json(data);  
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
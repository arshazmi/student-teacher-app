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

app.get('/teacher/edit/:id', async function(req,res){
    await db.any('SELECT id,name,course FROM teacher WHERE id=${id}',
       {id:req.params.id} 
    ).then(data=>{
        console.log("Data from db:",data);
        res.status(200).json(data);
        });

});

app.post('/teacher/edit/:id', async function(req,res){
    console.log('Params::',req.params);
    await db.none('UPDATE teacher SET name=${fn},  course=${sub} WHERE id=${id}',
    {
      fn:req.body.fn,
      sub:req.body.sub,
      id:req.params.id      
    });
    var data = {
        'status': "Valid",
        'statuscode': "5002", 
    };
    res.status(200).json(data);
});

app.get('/teacher/delete/:id', async function(req,res){
    await db.none('DELETE  FROM teacher where id=${id}',{
        id:req.params.id
    });
    var data = {
        'status': "Valid",
        'statuscode': "5004", 
    };
     res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
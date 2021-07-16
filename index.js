const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.static('public'))
app.set('view engine', 'ejs');
var pgp = require('pg-promise')( /* options */ )
var db = pgp('postgres://postgres:1234@localhost:5432/student-teacher');

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
        await db.none('update teacher set  name=${name}, password=${course} where id = ${id}', {
            name: req.body.name,
            course: req.body.course,
            id: req.body.id
        })
    }

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
})

app.get('/studreg',(req,res)=>{
    res.render('studreg')
})

//-----------------------student registerations----------------------------------
app.post('/api/select/post', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    // if (req.body.id === '') {
        await db.none('INSERT INTO student (name,dob,course,address,email,phone,password) VALUES(${name},${dob},${course},${address},${email},${phone},${password})', { 
            name: req.body.name,
            dob: req.body.dob,
            course: req.body.course,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });

    // // } else {
    //     await db.none('update ajaxuser set  name=${name},age=${age} where id = ${id}', {
    //         name: req.body.name,
    //         age: req.body.age,
    //         id: req.body.id
    // //     })
    // // }

    var data = {
        'status': "Valid",
        'status-code': "5001",
    };
    res.status(200).json(data);

})
app.get('/studfeedbck',(req,res)=>{
    res.render('studfeedbck')
})

//----------------------- feedback----------------------------------
app.post('/api/feedback/post', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    if (req.body.id === '') {
        await db.none('INSERT INTO feedback (teacher,feed) VALUES(${teacher},${feed})', { 
            teacher: req.body.teacher,
            feed: req.body.feed
           
           
        });

    } else {
        await db.none('update feedback set  teacher=${teacher},feed=${feed} where id = ${id}', {
            teacher: req.body.teacher,
            feed: req.body.feed,
            id: req.body.id
        })
    }

    var data = {
        'status': "Valid",
        'status-code': "5001",
    };
    res.status(200).json(data);

})
//----------------------- feedback- select---------------------------------
app.get('/api/selectapi', async (req, res) => {
    console.log(req.params.id);
    await db.any('select * from  feedback ').then(datan => {
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
//----------------------- feedback- select edit---------------------------------
app.get('/api/selectapi/edit/:id', async (req, res) => {
    console.log(req.params.id);
    await db.any('select id,teacher,feed from feedback where id='+ req.params.id ).then(datan => {
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



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


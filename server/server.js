import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


const app= express();
app.use(express.json())
app.use(cors())

app.listen('2030', () => {
     console.log('server running on 2030 port')
})

const db = mysql.createConnection({
     host: 'localhost',
     user:'root',
     password: '',
     database:'bschool'
})
db.connect(err => {
     if (err) return console.error(err);
     return console.log('Database connected succesfully')  
})

// analyst status API

app.get('/stats', (req, res) => {
     const sql =
       "SELECT COUNT(student.id) as studentno FROM student UNION  SELECT COUNT(class.id) FROM class UNION SELECT COUNT(section.id) FROM section ";
     db.query(sql, (err, result) => {
          if (err) return res.json(err);
          return res.json(result)
     })
})

// GET all student API

app.get('/student', (req, res) => {
     const sql = 'SELECT * FROM student';
     db.query(sql, (err, result) => {
          if (err) return res.json({Message:'ERROR internal server'});
          return res.json(result)
     })
})

// CREATE student API

app.post('/createstu', (req, res) => {
     const data = [req.body.name, req.body.age, req.body.classes];
     const sql = 'INSERT INTO student(name,age,class_id) VALUES(?)';
     db.query(sql, [data], (err,result) => {
          if (err) return res.json(err);
          return res.json(result)
     })
})

//GET class API 
app.get('/class', (req, res) => {
     const sql =
       "select class.level, section.s_short from class,section where class.section_id=section.id";
     db.query(sql, (err, result) => {
          if (err) return res.json({ Message: 'ERROR internal server' });
          return res.json(result)
     })
})

// CREATE class API

app.post('/createcl', (req, res) => {
     const data = [
          req.body.level,
          req.body.section
     ];
     const sql = 'INSERT INTO class(`level`,`section_id`) VALUES (?)';
     db.query(sql, [data], (err, result) => {
          if (err) return res.json(err);
          return res.json(result) 
     })
})
// GET section API
app.get('/section', (req, res) => {
     const sql = 'SELECT * FROM section'
     db.query(sql, (err, result) => {
          if (err) return res.json({ Message: 'ERROR internal server' });
          return res.json(result)
     })
})
// CREATE section API

app.post('/createse', (req, res) => {
     const data = [
          req.body.name,
          req.body.short
     ];
     const sql = 'INSERT INTO section (name,s_short) VALUES (?)';
     db.query(sql, [data], (err, result) => {
          if (err) return res.json(err);
          return res.json(result)
     })
})

// GET student by id API



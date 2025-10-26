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
     const sql =
       "select student.name, student.age, class.level, section.name, section.s_short from student,class,section where student.class_id=class.id and class.section_id=section.id";
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
       "select class.id class.level, section.s_short from class,section where class.section_id=section.id";
     db.query(sql, (err, result) => {
          if (err) return res.json({ Message: 'ERROR internal server' });
          return res.json(result)
     })
})
// GET class (to display) API
app.get('/classd', (req, res) => {
     const sql = 'SELECT * FROM class'
     db.query(sql, (err, result) => {
          if (err) return res.json(err);
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

// GET section (to display) API

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

app.get('/read_student/:name', (req, res) => {
     const data = req.params.name;
     const sql = 'select student.name, student.age, class.level, section.name, section.s_short from student,class,section where student.class_id=class.id and class.section_id=section.id and student.name = ?';
     db.query(sql, [data], (err, result) => {
          if (err) return res.json(err);
          return res.json(result)
     })
})

// GET class by id API

app.get("/read_class/:id", (req, res) => {
  const sql =
          "select class.level, section.s_short from class,section where class.section_id=section.id and class.id = ?";
     const id = req.params.id;
  db.query(sql,[id], (err, result) => {
    if (err) return res.json({ Message: "ERROR internal server" });
    return res.json(result);
  });
});

//GET student in class API

app.get("/read_class_student/:id", (req, res) => {
  const sql = "select name,age from student where class_id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "ERROR internal server" });
    return res.json(result);
  });
});

// GET section by name

app.get("/read_section/:name", (req, res) => {
     const sql = "SELECT * FROM section where name=?";
     const data = req.params.name;
  db.query(sql,[data],(err, result) => {
    if (err) return res.json({ Message: "ERROR internal server" });
    return res.json(result);
  });
});

// GET class in section API

app.get("/read_section_class/:id", (req, res) => {
  const sql = "SELECT level FROM class where section_id=?";
  const data = req.params.id;
  db.query(sql, [data], (err, result) => {
    if (err) return res.json({ Message: "ERROR internal server" });
    return res.json(result);
  });
});

//UPDATE student by name API

app.put('/update_student/:name', (req, res) => {
     const data = [
          req.body.name,
          req.body.age,
          req.body.classes,
          req.params.name
     ]
     const sql = 'UPDATE student SET name=?,age=?,class_id=? WHERE name=?' 
     db.query(sql, [data], (err, result) => {
          if (err) return res.json(err);
          return res.json(result)
     })
})

// UPDATE class API

app.put('/update_class/:id', (req, res) => {
     const data = [req.body.level, req.body.section_id, req.params.id];
     const sql = 'UPDATE class SET level = ?, section_id = ? where id = ?'
     db.query(sql, [data], (err, result) => {
          if (err) return res.json(err);
          return res.json(result);
     })
})

// UPDATE section by id API

app.put("/update_section/:name", (req, res) => {
  const data = [req.body.name, req.body.s_short, req.params.name];
  const sql = "UPDATE class SET name = ?, s_short = ? where name = ?";
  db.query(sql, [data], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//DELETE student by name API

app.delete('/delete_student/:name', (req, res) => {
     const name = req.params.name;
     const sql = 'DELETE * FROM student WHERE name=?';
     db.query(sql, [name], (err, result) => {
          if (err) return res.json(err);
          return res.json(result);
     })
})

// DELETE section by name API

app.delete("/delete_section/:name", (req, res) => {
  const name = req.params.name;
  const sql = "DELETE * FROM section WHERE name=?";
  db.query(sql, [name], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// DELETE class by id API

app.delete("/delete_class/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE * FROM class WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// DELETE student by class

app.delete("/delete_class_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE * FROM student WHERE class_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//DELETE class by section

app.delete("/delete_section_class/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE * FROM class WHERE section_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
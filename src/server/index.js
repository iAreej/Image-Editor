const express= require('express');
const app=express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());

var connection = mysql.createConnection({
	host : 'localhost',
	database : 'imagegallery',
	user : 'root',
	password : '1234'
});

connection.connect((err) => {
    if (err) {
      console.log('Database connection error :' + err)
      return
    }
    console.log('Connected to database')
  })

  app.use(express.static(`main`));
  module.exports = connection
  let sql = `SELECT  ImageLinks FROM images;`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
 console.log("hi");
});

  app.get('/hello', function(req, res){
    let sql = `SELECT  ImageLinks FROM images;`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      } 
      res.send(results); 
    
    })
  });

  app.listen(3001,()=>{
    console.log("running on port 3001");
})
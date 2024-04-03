const express = require("express");
const bodyParser = require("body-parser")
const Pool = require('pg').Pool
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'postgres',
   password: 'postgres',
   port: 3000,
})

app.get("/api/products", (req, res) => {

   const sql = "SELECT * FROM products";

   pool.query(sql, (error, results) => {

       if (error) throw error

       res.status(200).json(results.rows)
   })
});

app.post("/api/products/create", (req, res) => {

   console.log(req.body);

   const id = req.body.id;
   const name = req.body.name;
   const price = req.body.price;

   const sql = "INSERT INTO products (id, name, price) VALUES ($1, $2, $3)";

   const data = [id, name, price];

   pool.query(sql, data, (error, results) => {

       if (error) throw error

       res.status(200).json(results.rows)
   });


   res.status(200).send("ok");
})

app.listen(5050, () => {
   console.log("Listening");
});



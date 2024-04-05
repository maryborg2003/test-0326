const express = require("express");
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'postgres',
   password: 'postgres',
   port: 5432,
});

app.get("/api/product", (req, res) => {
   const sql = "SELECT * FROM product";

   pool.query(sql, (error, results) => {
       if (error) throw error;

       res.status(200).json(results.rows);
   });
});

app.post("/api/product/create", (req, res) => {
   console.log(req.body);

   const id = req.body.id;
   const productname = req.body.productname; 
   const price = req.body.price;

   const sql = "INSERT INTO product (id, productname, price) VALUES ($1, $2, $3)";
   const data = [id, productname, price]; 

   pool.query(sql, data, (error, results) => {
       if (error) throw error;

       
       pool.query('COMMIT', (err) => {
           if (err) {
               
               throw err;
           }
           console.log('Transaction completed.');
       });

       res.status(200).send("ok");
   });
});

app.listen(5500, () => {
   console.log("Listening on port 5500");
});

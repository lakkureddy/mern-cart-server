//import modules
//using require() functions, we can import modules
const express = require("express");
const mongoDb = require("mongodb");
const cors = require("cors");

//create the rest object
const app = express();
//where app is the rest object

//enable cors policy
app.use(cors());

//set the json as MIME TYPE
app.use(express.json());

//create the reference to connect to mongo db
const refVar = mongoDb.MongoClient;

//create the get rest api
app.get("/products",(req, res) => {
    refVar.connect("mongodb+srv://admin:admin@cluster0.kfwlo.mongodb.net/ecommerce?retryWrites=true&w=majority", (err, connection) => {
        if(err) throw err;
        else {
            const db = connection.db("ecommerce");
            db.collection("products").find().toArray((err, array) =>{
                if(err) throw err;
                else{
                    res.send(array);
                }
            })
        }
    });

});

let port = process.env.PORT || 1234;
app.listen(port, () =>{
    console.log(`server listening on port number ${port}`)
}); 
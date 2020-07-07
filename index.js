
'use strict'
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(8080,function (){
    console.log("Servidor levantado correctamente");
});

//crear conexion a DB
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"inventariotest"
});
connection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexion correcta a BD");
    }
});
//hasta aqui se prueba la conneccion a la DB



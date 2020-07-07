
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

app.get("/centrosPoblados/get/:id",function (request,response) {
    var id = request.params.id;
    var query = "select * from centrospoblados where idCentroPoblado = ?";
    connection.query(query,[id],function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

app.get("/centrosPoblados/get",function (request,response) {
    var query = "select * from centrospoblados";
    connection.query(query,function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

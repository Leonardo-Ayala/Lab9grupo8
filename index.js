//const fs = require('fs');

/*
//sincrono
var textfile = fs.readFileSync('Hola.txt');
console.log(textfile.toString());
console.log("Fin del programa");*/

/*
//asincrono
fs.readFile("Hola.txt",function (error,info){
    console.log(info.toString());
});
console.log("Fin del programa");*/

//esta parte se copia
'use strict'
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
// la parte superior se copia

app.listen(8080,function (){
    console.log("Servidor levantado correctamente");
});

//crear conexion a DB
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"northwind"
});
connection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexion correcta a BD");
    }
});
//hasta aqui se prueba la conneccion a la DB


app.get("/listarProductos",function (request,response) {
    var query = "select * from products";
    connection.query(query,function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

app.get("/obtenerProducto/:id",function (request,response) {
    var id = request.params.id;
    var query = "select * from products where productid = ?";
    connection.query(query,[id],function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

app.get("/",function (request,response){
    response.send("Hola Leo");
});


app.get("/pucp/:nombre",function (request,response){
    var nombre = request.params.nombre;
    console.log("Nueva solicitud a /pucp/"+nombre);
    response.send("Hola "+ nombre);
});

//se recibe parametro con ?name=algo
app.get("/telecom",function (request,response){
    var nombre = request.query.nombre;
    console.log("Nueva solicitud a /telecom?nombre="+nombre);
    response.send("Hola "+ nombre);
});

/*parametros por post
*nombre
*apellido
*POSTMAN POST: BODY/x-www-form... */
app.post("/post",function (request,response){
    var nombre = request.body.nombre;
    var apellido = request.body.apellido;
    //response.send(`Nombre: ${nombre} | Apellido: ${apellido}`);
    var jsonRespuesta = {data:{nombre:nombre,apellido: apellido}};
    //var jsonRespuestaOpt = {"nombre":nombre, "apellido":apellido};
    response.json(jsonRespuesta);
});

//se RECIBE un json JSON json JSON
//Postman con POST: BODY/RAW/JSON
app.post("/hola",express.json(), function (request,response){
    response.json(request.body);
    console.log(request.body);
});

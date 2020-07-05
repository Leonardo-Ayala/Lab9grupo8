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

'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

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

app.listen(8080,function (){
    console.log("Servidor levantado correctamente");
});

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

//localhost:3000/
app.get("/",function (request,response){
    response.send("Hola Leo");
});


app.get("/pucp/:nombre",function (request,response){
    var nombre = request.params.nombre;
    console.log("Nueva solicitud a /pucp/"+nombre);
    response.send("Hola "+ nombre);
});

app.get("/telecom",function (request,response){
    var nombre = request.query.nombre;
    console.log("Nueva solicitud a /telecom?nombre="+nombre);
    response.send("Hola "+ nombre);
});

/*parametros por post
*nombre
*apellido
* */
app.post("/post",function (request,response){
    var nombre = request.body.nombre;
    var apellido = request.body.apellido;
    //response.send(`Nombre: ${nombre} | Apellido: ${apellido}`);
    var jsonRespuesta = {"nombre":nombre,
                        "apellido":apellido};
    response.json(jsonRespuesta);
});



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


app.post("/centrosPoblados/create",function (request,response){
    var idCentroPoblado = request.body.idCentroPoblado;
    var nombreCentroPoblado = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    var query = "INSERT INTO centrospoblados (idCentroPoblado,nombreCentroPoblado,ubigeo)  values (?, ?, ?)";
    var parametros = [idCentroPoblado,nombreCentroPoblado,ubigeo];
    connection.query(query,parametros,function (error,result) {
        if(error){
            console.log(error);
        }else{
            var query = "select * from centrospoblados where idCentroPoblado = ?";
            var parametros2 = [idCentroPoblado];
            connection.query(query,parametros2,function (error,result) {
                if(error){
                    console.log(error);
                }else{
                    response.json(result);
                }
            });
        }
    });

});

app.post("/centrosPoblados/update",function (request,response){
    var idCentroPoblado = request.body.idCentroPoblado;
    var nombreCentroPoblado = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    var query = "UPDATE centrospoblados SET nombreCentroPoblado = ?,ubigeo = ? Where idCentroPoblado = ?";
    var parametros = [nombreCentroPoblado,ubigeo,idCentroPoblado];
    connection.query(query,parametros,function (error,result) {
        if(error){
            console.log(error);
        }else{
            var query = "select * from centrospoblados where idCentroPoblado = ?";
            var parametros2 = [idCentroPoblado];
            connection.query(query,parametros2,function (error,result) {
                if(error){
                    console.log(error);
                }else{
                    response.json(result);
                }
            });
        }
    });

});


app.get("/categoriasEquipo/get/:id",function (request,response) {
    var id = request.params.id;
    var query = "select * from categoriaequipo where idCategoriaEquipo = ?";
    connection.query(query,[id],function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

app.get("/categoriasEquipo/get",function (request,response) {
    var query = "select * from categoriaequipo";
    connection.query(query,function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});

app.post("/categoriasEquipo/create",function (request,response){
    var nombreCategoriaEquipo = request.body.nombreCategoriaEquipo;
    var query = "INSERT INTO categoriaequipo (nombre)  values (?)";
    var parametros = [nombreCategoriaEquipo];
    connection.query(query,parametros,function (error,result) {
        if(error){
            console.log(error);
        }else{
            var query = "select * from categoriaequipo where idCategoriaEquipo = ?";
            var parametros2 = [result.insertId];
            connection.query(query,parametros2,function (error,result2) {
                if(error){
                    console.log(error);
                }else{
                    response.json(result2);
                }
            });
        }
    });

});

app.post("/categoriasEquipo/update",function (request,response){
    var idCategoriaEquipo = request.body.idCategoriaEquipo;
    var nombreCategoriaEquipo = request.body.nombreCategoriaEquipo;
    var query = "UPDATE categoriaequipo SET nombre = ? Where idCategoriaEquipo = ?";
    var parametros = [nombreCategoriaEquipo,idCategoriaEquipo];
    connection.query(query,parametros,function (error,result) {
        if(error){
            console.log(error);
        }else{
            var query = "select * from categoriaequipo where idCategoriaEquipo = ?";
            var parametros2 = [idCategoriaEquipo];
            connection.query(query,parametros2,function (error,result) {
                if(error){
                    console.log(error);
                }else{
                    response.json(result);
                }
            });
        }
    });

});
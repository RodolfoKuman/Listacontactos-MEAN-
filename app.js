/* Dependencias utilizadas en el proyecto */

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactos',['contactos']); // conectando con la base de datos
var bodyParser = require('body-parser');



app.use(express.static(__dirname + "/public")); // Añadiendo una ruta publica para recursos
app.use(bodyParser.json());

/* Obteniendo los datos almacenados en la base de datos para mostrarlos en el index */
app.get('/contactos',function(req,res){
  db.contactos.find(function(err,docs){
  res.json(docs);
  });
});

/* Insertando un registro en la base de datos */
app.post('/contactos',function(req,res){
  db.contactos.insert(req.body, function(err,doc){
    res.json(doc);
  });
});

/* Eliminando un registro  */
app.delete('/contact/:id',function(req ,res){
  var id = req.params.id;
  db.contactos.remove({_id: mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

/* Buscando un registro por su id  */

app.get('/contact/:id',function(req ,res){
  var id = req.params.id;
  db.contactos.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

/* Modificando un registro despues de encontrar su id  */
app.put('/contact/:id',function(req,res){
  var id = req.params.id;
  db.contactos.findAndModify({ query: {_id: mongojs.ObjectId(id)},
    update: {$set: {nombre: req.body.nombre, email: req.body.email, telefono:req.body.telefono}},
    new:true}, function(err,doc){
      res.json(doc);
    });

});

app.listen(3000); 
console.log("Servidor corriendo en el puerto 3000");

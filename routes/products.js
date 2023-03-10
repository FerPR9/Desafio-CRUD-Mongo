var express = require("express");
var router = express.Router();
let productModel = require('../modelos/productModel');

//Listado de todos los productos
router.get("/", async function (req, res, next) {
  const result = await productModel.find();
  res.json(result);
});



router.post("/", async function (req, res, next) {
  let producto = new productModel({
    "id": req.body.id,
    "name": req.body.name,
    "description": req.body.description,
    "price":req.body.price,
    "images":req.body.images
  });
  const result = await producto.save();
  res.json("Producto agregado");  
});


router.put("/:id", async function (req, res, next) {

  const filter = {id: req.query.id}; //Condición de Query
  const update = {name: req.query.name}; //Campos a modificar
  const resultado = await productModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });

  res.json("Producto actualizado correctamente");
});

router.delete("/:id", async function (req, res, next) {
  //Buscar un producto por ID y regresa una lista
  const resul = await productModel.find({id: req.params.id}).exec();
  //Si se encontró lo elimina
  if (resul.length > 0) {
      await productModel.deleteOne({id: req.params.id});
      res.json("Producto eliminado correctamente");
  } else {
      res.json({error: "No se encontró el producto con Id " + req.params.id})
  }
});


module.exports = router;
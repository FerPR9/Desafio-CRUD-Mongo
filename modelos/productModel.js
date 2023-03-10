const mongo = require('mongoose');

const ProductoEsquema = new mongo.Schema({
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required:true,
    },
    price: {
      type: Number,
      required:true,
    },
    description: {
      type: String,
     
    },
    images:[String],
   });
   
   
   module.exports = mongo.model("Producto", ProductoEsquema);
const mongoose = require("mongoose");

//Schema for new Factory
const FactorySchema = mongoose.Schema({
  FactoryName: {
    type: String,
    unique: true,
    index: true,
    required: true
  }, //set factoryname type to string
  Children: [
    {
      type: Number,
      min: 1,
      max: 1000,
      required: true
    }
  ] //validate min max and number type
});

const Factory = (module.exports = mongoose.model("factories", FactorySchema));

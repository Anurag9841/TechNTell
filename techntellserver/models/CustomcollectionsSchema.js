var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const validator = (val) => {
  const valReg = /\w+@\w+.com$/gi;
  return valReg.test(val);
};
const customValidator = [validator, "Email syntax is not appropiate."];

let completeCustomCollectionSchema = new Schema({
  columnsComboName: {
    type: String,
    required: true,
    unique: true,
  },
  columnsComboDescription: {
    type: String,
    required: false,
  },

  columnsChosen: [
    {
      type: String,
      required: true,
    },
  ],
  collectionsForColumnsChosen: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'customCollections'
    }
  ],
},
{ timestamps: true });

module.exports = mongoose.model("completeCustomCollections", completeCustomCollectionSchema);

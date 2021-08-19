var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const validator = (val) => {
  const valReg = /\w+@\w+.com$/gi;
  return valReg.test(val);
};
const customValidator = [validator, "Email syntax is not appropiate."];
var User = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  hash: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: customValidator,
  },
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  shipper: {
    type: Boolean,
    default: false,
    required: true,
  },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  PC_collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PC_collections",
    },
  ],
  customCollections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "completeCustomCollections",
    },
  ],
});

module.exports = mongoose.model("User", User);

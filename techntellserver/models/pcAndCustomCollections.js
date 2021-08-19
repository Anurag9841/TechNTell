const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const validator = (val) => {
  return val == "PC_collections" || val == "customCollections";
};
const customValidator = [
  validator,
  "collectionType must be one of the two values: PC_collections or customCollections.",
];

var sharedCollectionSchema = {
  collectionName: {
    type: String,
    required: true,
    unique: true,
  },
  collectionDescription: {
    type: String,
    required: false,
  },
  prodChosen: {},
  collectionType: {
    type: String,
    required: true,
    validate: customValidator,
  },
};

var PC_collectionsSchema = new Schema(
  {
    ...sharedCollectionSchema,
  },
  {
    timestamps: true,
  }
);

var customCollectionsSchema = new Schema(
  {
    ...sharedCollectionSchema,
  },
  { timestamps: true }
);

var PC_collectionsModel = mongoose.model(
  "PC_collections",
  PC_collectionsSchema,
  "buildCollections"
);
var customCollectionsModel = mongoose.model(
  "customCollections",
  customCollectionsSchema,
  "buildCollections"
);
module.exports = {
  PC_collectionsModel,
  customCollectionsModel,
};

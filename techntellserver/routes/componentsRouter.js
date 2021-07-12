const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { isAdmin } = require("../Authentication/adminAuth");

const ComponentsRouter = express.Router();
const {
  CPUModel,
  CPUCoolerModel,
  MotherboardModel,
  MemoryModel,
  StorageModel,
  VideoCardModel,
  CaseModel,
  PowerSupplyModel,
  OSModel,
  MonitorModel,
} = require("../models/componentsSchema");
const { ComponentCategories } = require("../models/categoryModel");

const abc = [
  CPUModel,
  CPUCoolerModel,
  MotherboardModel,
  MemoryModel,
  StorageModel,
  VideoCardModel,
  CaseModel,
  PowerSupplyModel,
  OSModel,
  MonitorModel,
];

var model = null;

const get_model = (value_received) => {
  if (value_received == "CPU") model = CPUModel;
  else if (value_received == "CPUCooler") model = CPUCoolerModel;
  else if (value_received == "Motherboard") model = MotherboardModel;
  else if (value_received == "Memory") model = MemoryModel;
  else if (value_received == "Storage") model = StorageModel;
  else if (value_received == "VideoCard") model = VideoCardModel;
  else if (value_received == "Case") model = CaseModel;
  else if (value_received == "PowerSupply") model = PowerSupplyModel;
  else if (value_received == "OperatingSystem") model = OSModel;
  else if (value_received == "Monitor") model = MonitorModel;
};


ComponentsRouter.route("/categories/").post(isAdmin, (req, res, next) => {
  ComponentCategories.create(req.body)
    .then(
      (category) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(category);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

ComponentsRouter.route("/:categId").get((req, res, next) => {
  console.log();
  console.log(req.params.categId);
  console.log(req.params.categId.replace(" ", "") + "Model");
  ComponentCategories.findOne({ categoryName: req.params.categId })
    .populate("products")
    .then(
      (category) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(category);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

ComponentsRouter.route("/:categId/products")
.get((req, res, next) => {

    Categories.findOne({ categoryName: req.params.categId })
      .populate("products")
      .then(
        (category) => {
          if (category != null) {
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(category.products);
          } else {
            res.statusCode = 404;
            var err = new Error("Error category doesn't Exist");
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

.post(isAdmin, (req, res, next) => {
  ComponentCategories.findOne({ categoryName: req.params.categId })
    .then(
      (category) => {
        if (category != null) {
          ///
            get_model(req.params.categId.replace(" ", ""));
          ///
          model.create(req.body)
            .then(
              (product) => {
                // product.featured = (req.body.featured)? true:false
                category.products.push(product._id);
                category
                  .save()
                  .then((category) => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(category);
                  })
                  .catch((err) => next(err));
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        } else {
          res.statusCode = 403;
          const err = new Error(
            "Category with id:" + req.params.categId + " doesnot exist"
          );
          next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});



module.exports = ComponentsRouter;

var express = require("express");
var bodyParser = require("body-parser");
var User = require("../models/userSchema");
var router = express.Router();
router.use(bodyParser.json());
const {
  PC_collectionsModel,
  customCollectionsModel,
} = require("../models/pcAndCustomCollections");
var completeCustomCollections = require("../models/CustomcollectionsSchema");
const passport = require("passport");
const password = require("../Authentication/password");
const authenticate = require("../Authentication/authenticate");
const isAdmin = require("../Authentication/adminAuth").isAdmin;
const { Schema } = require("mongoose");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  function (req, res, next) {
    console.log("Headers are here", req.headers);
    User.find({})
      .then((user) => {
        res.statusCode = 200;
        res.json(user);
      })
      .catch((err) => next(err));
  }
);
router.post("/signup", (req, res, next) => {
  const saltAndHash = password.genSaltAndHash(req.body.password);

  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email,
  });

  newUser.salt = saltAndHash.salt;
  newUser.hash = saltAndHash.hash;

  newUser
    .save()
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.statusCode = 200;
  const returned = authenticate.issueJwt(req.user);
  console.log(returned.token);
  res.json({ token: returned.token, expiresIn: returned.expiresIn });
});

/*router.post('/signup/admin', (req, res,next) => {
  User.push(req.body, req.body.password, (err, user) => {
    if(err){
      next(err);
    }
    else{
      user.admin = true;
      user.save()
      .then((user) => {
        res.statusCode = 200;
        res.json(user);
      }, (err) => next(err))
      .catch((err) => next(err));
    }
  })
})
*/

router.get("/currentUser", authenticate.verifyJson, (req, res, next) => {
  User.findById(req.user._id)
    .populate("customCollections")
    .populate("PC_collections")
    .populate({
      path: "customCollections",
      populate: {
        path: "collectionsForColumnsChosen",
        model: "customCollections",
      },
    })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.json(user);
    });
});

router.get(
  "/currentUser/collections",
  authenticate.verifyJson,
  (req, res, next) => {
    User.findById(req.user._id)
      .populate("PC_collections")
      .populate("customCollections")
      .populate({
        path: "customCollections",
        populate: {
          path: "collectionsForColumnsChosen",
          model: "customCollections",
        },
      })
      .then((user) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json({
          PC_collections: user.PC_collections,
          customCollections: user.customCollections,
        });
      });
  }
);

router.get(
  "/currentUser/customCollections/:comboName",
  authenticate.verifyJson,
  (req, res, next) => {
    User.findById(req.user._id)
      .populate("customCollections")
      .populate({
        path: "customCollections",
        populate: {
          path: "collectionsForColumnsChosen",
          model: "customCollections",
        },
      })
      .then((user) => {
        const finalCollections = user.customCollections.filter((dat) => {
          return dat.columnsComboName == req.params.comboName;
        });

        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(finalCollections[0]);
      });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.end("logged out!!");
});

// router.get("/addCollection", authenticate.verifyJson, (req, res, next) => {
//   // const collections = {
//   //   collectionName: req.body.collectionName,
//   //   collectionDescription: req.body.collectionDescription,
//   //   collectionType: req.body.collectionType,
//   //   prodChosen: req.body.prodChosen,
//   // };
//   if (req.body.collectionType == "PC_collections") {
//     console.log('pc collections');
//     PC_collectionsModel.create(req.body).then(
//       (collectionDoc) => {
//         User.findById(req.user._id)
//           .then(
//             (user) => {
//               user.PC_collections.push(collectionDoc._id);
//               user
//                 .save()
//                 .then(
//                   (newUser) => {
//                     res.statusCode = 200;
//                     res.setHeader("content-type", "application/json");
//                     res.json(newUser);
//                   },
//                   (err) => next(err)
//                 )
//                 .catch((err) => next(err));
//             },
//             (err) => next(err)
//           )
//           .catch((err) => next(err));
//       },
//       (err) => next(err)
//     );
//   } else if (req.body.collectionType == "customCollections") {

//     customCollectionsModel.create(req.body).then(
//       (collectionDoc) => {
//         User.findById(req.user._id)
//           .then(
//             (user) => {
//               user.customCollections.push(collectionDoc._id);
//               user
//                 .save()
//                 .then(
//                   (newUser) => {
//                     res.statusCode = 200;
//                     res.setHeader("content-type", "application/json");
//                     res.json(newUser);
//                   },
//                   (err) => next(err)
//                 )
//                 .catch((err) => next(err));
//             },
//             (err) => next(err)
//           )
//           .catch((err) => next(err));
//       },
//       (err) => next(err)
//     );
//   } else {
//     res.statusCode = 403;
//     const err = new Error("invalid collectionType");
//     next(err);
//   }
// });

router.post("/addCollection", authenticate.verifyJson, (req, res, next) => {
  // const collections = {
  //   collectionName: req.body.collectionName,
  //   collectionDescription: req.body.collectionDescription,
  //   collectionType: req.body.collectionType,
  //   prodChosen: req.body.prodChosen,
  // };
  if (req.body.collectionType == "PC_collections") {
    PC_collectionsModel.find({collectionName: req.body.collectionName})
    .then(
      respPC_collectionsModel => {
        if(respPC_collectionsModel.length == 0){ //unique incoming collection
          PC_collectionsModel.create(req.body)
          .then(
            (collectionDoc) => {
              User.findById(req.user._id)
                .then(
                  (user) => {
                    user.PC_collections.push(collectionDoc._id);
                    user
                      .save()
                      .then(
                        (newUser) => {
                          res.statusCode = 200;
                          res.setHeader("content-type", "application/json");
                          res.json(newUser);
                        },
                        (err) => next(err)
                      )
                      .catch((err) => next(err));// user.save
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err)); //User findById
            },
            (err) => next(err)
          )
          .catch((err) => next(err)); // PC_collectionsModel create
        }
        else{ //collection already in the db
          console.log("respPC_collectionsModel", respPC_collectionsModel);
          PC_collectionsModel.create(req.body)
          .then(
            (collectionDoc) => {
              User.findById(req.user._id)
                .then(
                  (user) => {
                    let arr_temp = [];
                    
                    respPC_collectionsModel.map((jsonDoc) => {
                      arr_temp.push(jsonDoc._id);
                    })

                    let finalPCCollections = user.PC_collections.filter((docId) => {return !(arr_temp.includes(docId))});
                    

                    user.PC_collections = finalPCCollections;
                    user.PC_collections.push(collectionDoc._id);
                    user
                      .save()
                      .then(
                        (newUser) => {
                          res.statusCode = 200;
                          res.setHeader("content-type", "application/json");
                          res.json(newUser);
                        },
                        (err) => next(err)
                      )
                      .catch((err) => next(err));// user.save
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err)); //User findById
            },
            (err) => next(err)
          )
          .catch((err) => next(err)); // PC_collectionsModel create
        }
      }, err => next(err)
    )
    .catch(err => next(err)) //PC_collectionsModel find
    
  } else if (req.body.collectionType == "customCollections") {
    let customCollectionReq = {
      collectionName: req.body.collectionName,
      collectionDescription: req.body.collectionDescription,
      prodChosen: req.body.prodChosen,
      collectionType: req.body.collectionType,
    };
    completeCustomCollections
      .find({ columnsComboName: req.body.columnsComboName })
      .then((completeCustomDoc) => {
        if (completeCustomDoc.length != 0) {
          if (customCollectionReq.collectionName != null) {
            customCollectionsModel
              .find({ collectionName: customCollectionReq.collectionName })
              .then((respCustomCollectionModel) => {
                if (respCustomCollectionModel.length != 0) {
                  let finalCollectionsForColumns =
                    completeCustomDoc[0].collectionsForColumnsChosen.filter(
                      (jsonDoc) => {
                        return (
                          jsonDoc.collectionName !=
                          respCustomCollectionModel._id
                        );
                      }
                    );

                  customCollectionsModel
                    .create(customCollectionReq)
                    .then(
                      (respCustomCollection) => {
                        completeCustomDoc[0].collectionsForColumnsChosen =
                          finalCollectionsForColumns;
                        completeCustomDoc[0].collectionsForColumnsChosen.push(
                          respCustomCollection._id
                        );
                        completeCustomDoc[0]
                          .save()
                          .then(
                            (respCompleteCustomDoc) => {
                              User.findById(req.user._id)
                                .then(
                                  (finalProdUser) => {
                                    res.statusCode = 200;
                                    res.setHeader(
                                      "content-type",
                                      "application/json"
                                    );
                                    res.json(finalProdUser);
                                  },
                                  (err) => next(err)
                                )
                                .catch((err) => next(err)); //User findById
                            },
                            (err) => next(err)
                          )
                          .catch((err) => next(err)); //completeCustomDoc save
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err)); //customCollectionsModel create
                } else {
                  // this is a new collection
                  customCollectionsModel
                    .create(customCollectionReq)
                    .then(
                      (respCustomCollection) => {
                        completeCustomDoc[0].collectionsForColumnsChosen.push(
                          respCustomCollection._id
                        );
                        completeCustomDoc[0]
                          .save()
                          .then(
                            (respCompleteCustomDoc) => {
                              User.findById(req.user._id)
                                .then(
                                  (finalProdUser) => {
                                    res.statusCode = 200;
                                    res.setHeader(
                                      "content-type",
                                      "application/json"
                                    );
                                    res.json(finalProdUser);
                                  },
                                  (err) => next(err)
                                )
                                .catch((err) => next(err)); //User findById
                            },
                            (err) => next(err)
                          )
                          .catch((err) => next(err)); //completeCustomDoc save
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err)); //customCollectionsModel create
                }
              })
              .catch(); //customCollectionsModel find
          } else {
            //empty customCollectionReq.collectionName == null

            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.json({
              user: { ...req.user._doc },
              empty: "found by findById",
            });
          }
        } else {
          let completeCustomCollectionReq = {
            columnsComboName: req.body.columnsComboName,
            columnsComboDescription: req.body.columnsComboDescription,
            columnsChosen: req.body.columnsChosen,
          };
          console.log(
            "completeCustomCollectionReq",
            completeCustomCollectionReq
          );
          completeCustomCollections
            .create(completeCustomCollectionReq)
            .then(
              (completeCustomDoc) => {
                console.log("completeCustomDoc", completeCustomDoc);
                if (customCollectionReq.collectionName != null) {
                  customCollectionsModel
                    .create(customCollectionReq)
                    .then(
                      (respCustomCollection) => {
                        completeCustomDoc.collectionsForColumnsChosen.push(
                          respCustomCollection._id
                        );
                        completeCustomDoc
                          .save()
                          .then(
                            (respCompleteCustomDoc) => {
                              User.findById(req.user._id)
                                .then(
                                  (newUsr) => {
                                    newUsr.customCollections.push(
                                      respCompleteCustomDoc._id
                                    );
                                    newUsr
                                      .save()
                                      .then(
                                        (finalProdUser) => {
                                          console.log(
                                            "finalProdUser",
                                            finalProdUser
                                          );
                                          res.statusCode = 200;
                                          res.setHeader(
                                            "content-type",
                                            "application/json"
                                          );
                                          res.json(finalProdUser);
                                        },
                                        (err) => next(err)
                                      )
                                      .catch((err) => next(err)); // newUsr save finally
                                  },
                                  (err) => next(err)
                                )
                                .catch((err) => next(err)); //User findById
                            },
                            (err) => next(err)
                          )
                          .catch((err) => next(err)); //completeCustomDoc save
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err)); //customCollectionsModel create
                } else {
                  //empty customCollectionReq.collectionName == null

                  User.findById(req.user._id)
                    .then(
                      (newUsr) => {
                        newUsr.customCollections.push(completeCustomDoc._id);
                        newUsr
                          .save()
                          .then(
                            (finalProdUser) => {
                              res.statusCode = 200;
                              res.setHeader("content-type", "application/json");
                              res.json({
                                user: { ...finalProdUser },
                                empty: "newly made here completeCollection",
                              });
                            },
                            (err) => next(err)
                          )
                          .catch((err) => next(err)); // newUsr save finally
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err)); //User findById
                }
              },
              (err) => next(err)
            )
            .catch((err) => next(err)); // completeCustomCollections create
        }
      })
      .catch(); //completeCustomCollections find
  } else {
    res.statusCode = 403;
    const err = new Error(
      `invalid collectionType, i.e. ${req.body.collectionType}`
    );
    next(err);
  }
});
module.exports = router;

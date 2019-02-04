const express = require("express");
const router = express.Router();
const Factory = require("../models/schema");

router.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  router.on("message", data => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

//Post, Create Factory
router.post("/api/createFactory", (req, res) => {
  if (req.body.children.length !== 0) {
    let newFactory = {
      FactoryName: req.body.name,
      Children: req.body.children
    };
    Factory.create(newFactory)
      .then(data => res.json(data))
      .catch(err => res.send(err));
  } else {
    res.json({ Error: "Must have at least one Child Node" });
  }
});

//Get route
router.get("/api/getFactory", (req, res) => {
  Factory.find({})
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

//Delete one factory
router.patch("/api/deleteFactory", (req, res) => {
  Factory.findByIdAndDelete({ _id: req.body.id })
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

//Delete All
router.delete("/api/deleteAll", (req, res) => {
  Factory.deleteMany({})
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

//Update One Factory
router.put("/api/updateFactory", (req, res) => {
  Factory.findOneAndUpdate(
    {
      _id: req.body.id
    },
    { FactoryName: req.body.name, Children: req.body.children },
    { new: true }
  )
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

module.exports = router;

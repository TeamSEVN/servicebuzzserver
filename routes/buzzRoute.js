let router = require("express").Router();
let mongoose = require("mongoose");
let Buzz = mongoose.model("Buzz");

//get a list of unacknowledged buzzes
router.post("/fetchBuzzes", (req, res) => {
  Buzz.find({ acknowledged: false })
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error));
});

//add a buzz
router.post("/createBuzz", (req, res) => {
  //declares variable message that will receive the table from the props in actions
  let message = req.body.message;
  let newBuzz = new Buzz();
  newBuzz.message = message;
  newBuzz
    .save()
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

//delete the dismissed buzz
router.delete("/:id", (req, res) => {
  Buzz.findByIdAndDelete(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
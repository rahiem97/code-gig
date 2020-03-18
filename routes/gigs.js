const express = require("express");
const router = express.Router();
const database = require("../config/database");
const Gig = require("../models/Gig");

//Get the job list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs
      });
    })
    .catch(err => console.log("Error: " + err))
);

//Display add gig form
router.get("/add", (req, res) => {
  res.render("add");
});

//Add a job to the database
router.post("/add", (req, res) => {
  //destructuring
  let { title, technologies, budget, descrip, contact_email } = req.body;

  let errors = [];
  //Error Checking on the server side
  if (!title) {
    errors.push({ text: "Please include a title for this project" });
  }
  if (!technologies) {
    errors.push({ text: "Please include technologies" });
  }
  if (!descrip) {
    errors.push({ text: "Please include a project description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please include a contact email for this project" });
  }

  //Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      descrip,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unkown";
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',')

    //insert a new gig
    Gig.create({
      title,
      technologies,
      budget,
      descrip,
      contact_email
    })
      .then(gig => {
        res.redirect("/gigs");
        console.log(gig);
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;

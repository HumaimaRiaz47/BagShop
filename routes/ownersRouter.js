const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            // Fetch existing owners
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send("Owner already exists");
            }

            // Destructure request body
            let { fullname, email, password } = req.body;

            // Create a new owner
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            // Send the created owner with status code 201 (Created)
            res.status(201).send(createdOwner);
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
}

// Default GET route for owners
router.get("/", (req, res) => {
    res.send("hey, it's working");
});

module.exports = router;




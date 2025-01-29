// milkRoutes.js
const express = require('express');
const router = express.Router(); // This creates a new router instance
const MilkCollection = require('../models/MilkCollection'); // Adjust the path as needed

// Define your route logic here, for example:
router.get('/', async (req, res) => {
    try {
        const data = await MilkCollection.find(); // Replace with actual logic
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newMilkData = new MilkCollection(req.body);
        await newMilkData.save();
        res.status(201).send("Milk data added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Export the router instance
module.exports = router;

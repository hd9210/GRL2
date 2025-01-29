// farmerListRoutes.js
const express = require('express');
const router = express.Router();
const FarmerList = require('../models/FarmerList'); // Path to FarmerList model

// Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await FarmerList.find();
        res.json(farmers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a specific farmer by ID
router.get('/:id', async (req, res) => {
    try {
        const farmer = await FarmerList.findById(req.params.id);
        if (!farmer) {
            return res.status(404).send("Farmer not found");
        }
        res.json(farmer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new farmer
router.post('/', async (req, res) => {
    try {
        const newFarmer = new FarmerList(req.body);
        await newFarmer.save();
        res.status(201).send("Farmer added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update a farmer's information
router.put('/:id', async (req, res) => {
    try {
        const updatedFarmer = await FarmerList.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFarmer) {
            return res.status(404).send("Farmer not found");
        }
        res.json(updatedFarmer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a farmer
router.delete('/:id', async (req, res) => {
    try {
        const deletedFarmer = await FarmerList.findByIdAndDelete(req.params.id);
        if (!deletedFarmer) {
            return res.status(404).send("Farmer not found");
        }
        res.status(200).send("Farmer deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

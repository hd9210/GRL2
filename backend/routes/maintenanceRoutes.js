// maintenanceRoutes.js
const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance'); // Path to Maintenance model

// Get all maintenance records
router.get('/', async (req, res) => {
    try {
        const records = await Maintenance.find();
        res.json(records);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a specific maintenance record by ID
router.get('/:id', async (req, res) => {
    try {
        const record = await Maintenance.findById(req.params.id);
        if (!record) {
            return res.status(404).send("Maintenance record not found");
        }
        res.json(record);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new maintenance record
router.post('/', async (req, res) => {
    try {
        const newRecord = new Maintenance(req.body);
        await newRecord.save();
        res.status(201).send("Maintenance record added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update an existing maintenance record
router.put('/:id', async (req, res) => {
    try {
        const updatedRecord = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).send("Maintenance record not found");
        }
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a maintenance record
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecord = await Maintenance.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).send("Maintenance record not found");
        }
        res.status(200).send("Maintenance record deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

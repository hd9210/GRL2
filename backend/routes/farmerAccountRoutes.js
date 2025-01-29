// farmerAccountRoutes.js
const express = require('express');
const router = express.Router();
const FarmerAccount = require('../models/FarmerAccounts'); // Path to FarmerAccount model

// Get all farmer accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await FarmerAccount.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a specific farmer account by ID
router.get('/:id', async (req, res) => {
    try {
        const account = await FarmerAccount.findById(req.params.id);
        if (!account) {
            return res.status(404).send("Farmer account not found");
        }
        res.json(account);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new farmer account
router.post('/', async (req, res) => {
    try {
        const newAccount = new FarmerAccount(req.body);
        await newAccount.save();
        res.status(201).send("Farmer account added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update an existing farmer account
router.put('/:id', async (req, res) => {
    try {
        const updatedAccount = await FarmerAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccount) {
            return res.status(404).send("Farmer account not found");
        }
        res.json(updatedAccount);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a farmer account
router.delete('/:id', async (req, res) => {
    try {
        const deletedAccount = await FarmerAccount.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).send("Farmer account not found");
        }
        res.status(200).send("Farmer account deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

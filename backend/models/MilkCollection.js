const mongoose = require("mongoose");

const MilkCollectionSchema = new mongoose.Schema({
    FAT: { type: Number, required: true },
    SNF: { type: Number, required: true },
    RATE: { type: Number, required: true },
    Name: { type: String, required: true, maxlength: 30 },
    Number: { type: String, required: true, match: /^[0-9]{10}$/ },
    Date: { type: Date, default: Date.now },
    Time: { type: Date, default: Date.now },
    Shift: { type: String, enum: ["M", "E", "A"], required: true },
    Quantity: { type: Number, required: true },
    Density: { type: Number, required: true },
    Water: { type: Number, required: true },
    Amount: { type: Number, required: true },
    Cattle_Type: { type: String, enum: ["A", "B", "C", "D"], required: true },
});

MilkCollectionSchema.index({ Name: 1, Number: 1 }, { unique: true });

module.exports = mongoose.model("MilkCollection", MilkCollectionSchema);

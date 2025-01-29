const mongoose = require("mongoose");

const FarmerListSchema = new mongoose.Schema({
    CP_CODE: { type: String, required: true, unique: true },
    Local_Code: { type: Number, required: true, min: 1, max: 9999 },
    Farmer_Name: { type: String, required: true },
    Mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
    Rank: { type: String, required: true },
    Aadhar_Number: { type: String, match: /^[0-9]{12}$/ },
});

FarmerListSchema.index({ Farmer_Name: 1, Mobile: 1 }, { unique: true });
module.exports = mongoose.model("FarmerList", FarmerListSchema);

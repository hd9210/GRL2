const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
    CP_CODE: { type: String, required: true, unique: true },
    Lat: { type: String, required: true },
    Lat_direction: { type: String, enum: ["N", "S"], required: true },
    Long: { type: String, required: true },
    Long_direction: { type: String, enum: ["E", "W"], required: true },
    Tamper: { type: Boolean, required: true },
    Battery_per: { type: Number, required: true, min: 0, max: 100 },
    Memory_per: { type: Number, required: true, min: 1, max: 100 },
    error_code: { type: String, required: true },
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);

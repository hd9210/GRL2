const mongoose = require("mongoose");

const FarmerAccountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, match: /^[0-9]{10}$/ },
    email: {type: String,required: true,match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,},
    password: {type: String,required: true,minlength: 10,
    validate: {validator: function (v) { return (
                    /[A-Z]/.test(v) &&
                    /[a-z]/.test(v) &&
                    /[0-9]/.test(v) &&
                    /[^A-Za-z0-9]/.test(v)
                );
            },
            message: "Password must meet complexity requirements.",
        },
    },
});

module.exports = mongoose.model("FarmerAccount", FarmerAccountSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country_code: {
        type: String,
        required: [true, "Country code is required"],
      },
    phone_number: {
        type: String,
        required: [true, "Phone number is required"],
        minLength: [10, "Phone number must be 10 digits"],
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "suspended", "deleted"],
        default: "active",
      },
}, { timestamps: true });

// Add a unique index for the phone_number field
userSchema.index({ phone_number: 1 }, { unique: true });

export default  mongoose.model('Users', userSchema);

 

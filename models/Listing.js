import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    regularPrice: {
        type: Number,
        required: [true, "Regular price is required"],
    },
    discountPrice: {
        type: Number,
        required: [true, "Discount price is required"],
    },
    parking: {
        type: Boolean,
        required: [true, "parking is required"],
    },
    bathrooms: {
        type: Number,
        required: [true, "Number of bathrooms is required"],
    },
    bedrooms: {
        type: Number,
        required: [true, "Number of bedrooms is required"],
    },
    furnished: {
        type: Boolean,
        required: [true, "Furnished status is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    imageUrls: {
        type: Array, // Array of strings for image URLs
        required: [true, "Image URLs are required"],
    },
    offer: {
        type: Boolean,
        required: [true, "Offer status is required"],
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },
}, { timestamps: true });

export default mongoose.model("Listings", listingSchema);

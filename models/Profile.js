import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema =  Schema(
  {
    username: {
      type: String,
      required: false,
    },
    profile_image: {
      type: String,
      required: false,
    },
    gender: {
      type: String, // Male/Female
      enum: ['Male', 'Female', 'Other'],
      required: false,
    },
    gender_abbrev: {
      type: String, // M/F
      enum: ['M', 'F', 'O'],
      required: false,
    },
    timezone: {
      type: String, 
      required: false,
    },
  
    location: {
      current_lat: {
        type: Number,
        required: false,
      },
      current_lng: {
        type: Number,
        required: false,
      },
      last_lat: {
        type: Number,
        required: false,
      },
      last_lng: {
        type: Number,
        required: false,
      },
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    // Reference to the user model
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.index({ user_id: 1 });

export default mongoose.model("profiles", profileSchema);

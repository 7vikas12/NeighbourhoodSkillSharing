import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: [
      "Education",
      "Technical",
      "Household",
      "Health",
      "Other",
    ],
  },

  experienceLevel: {
    type: String,
    enum: ["Fresher", "Experienced"],
    required: true,
  },

  mode: {
    type: String,
    enum: ["Online", "Offline", "Both"],
    default: "Online",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  availability: {
    type: String,
    enum: ["Weekdays", "Weekends", "Anytime"],
    default: "Anytime",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export { Skill };

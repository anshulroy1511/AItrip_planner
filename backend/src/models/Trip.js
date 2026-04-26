const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: {
      type: [String], // ["Food", "Culture", "Adventure"]
      required: true,
    },

    itinerary: {
      type: Array,
      default: [],
    },

    budgetEstimate: {
      type: Object,
      default: {},
    },

    hotels: {
  type: mongoose.Schema.Types.Mixed,
  default: [],
},

  alerts: {
  type: [String],
  default: [],
 },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
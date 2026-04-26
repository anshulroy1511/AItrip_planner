const Trip = require("../models/Trip");
const {
  generateTripPlan,
  regenerateSpecificDay,
  generateTravelAlerts,
} = require("../services/ai.service");

// CREATE TRIP
exports.createTrip = async (req, res) => {
  try {
        console.log("AI Service path:", require.resolve("../services/ai.service"));
    const { destination, days, budgetType, interests } = req.body;

    // AI generation
    const aiData = await generateTripPlan({
      destination,
      days,
      budgetType,
      interests,
    });

    

     const alertData = await generateTravelAlerts({
        destination,
        days,
        interests,
    });

    const trip = await Trip.create({
      userId: req.user._id,
      destination,
      days,
      budgetType,
      interests,
      itinerary: aiData.itinerary,
      budgetEstimate: aiData.budgetEstimate,
      hotels: aiData.hotels,
      alerts: alertData.alerts,
    });

   
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER TRIPS
exports.getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TRIP------------
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // SECURITY CHECK so that only ralted user can access 
    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Activity to a specific day inside a trip itinerary. -----------
exports.addActivity = async (req, res) => {
  try {
    const { day, activity } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const dayPlan = trip.itinerary.find((item) => item.day === day);

    if (!dayPlan) {
      return res.status(404).json({ message: "Day not found" });
    }

    dayPlan.activities.push(activity);

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Remove Activity--------
exports.removeActivity = async (req, res) => {
  console.log("removeActivity controller hit");
console.log(req.body);
console.log(req.params);
  try {
    const { day, activity } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const dayPlan = trip.itinerary.find((item) => item.day === day);

    if (!dayPlan) {
      return res.status(404).json({ message: "Day not found" });
    }

    dayPlan.activities = dayPlan.activities.filter(
  (item) => item !== activity
);

trip.markModified("itinerary");

await trip.save();
console.log("Trip updated successfully for removal");

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Regenrate specific day------------
exports.regenerateDay = async (req, res) => {
  console.log("regenerateDay controller hit");
console.log(req.body);
console.log(req.params);
  try {
    const { day } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const aiDay = await regenerateSpecificDay({
      destination: trip.destination,
      day,
      interests: trip.interests,
    });

    const dayPlan = trip.itinerary.find((item) => item.day === day);

    dayPlan.activities = aiDay.activities;

trip.markModified("itinerary");

await trip.save();
console.log("Trip updated successfully for regenration ");

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getDashboardTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user._id,
    }).select(
      "destination days budgetType budgetEstimate hotels createdAt"
    );

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
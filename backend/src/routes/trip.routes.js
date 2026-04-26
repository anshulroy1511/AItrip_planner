const express = require("express");
const router = express.Router();

const {
  createTrip,
  getUserTrips,
  getTripById,
   addActivity,
  removeActivity,
  regenerateDay,
  getDashboardTrips,
} = require("../controllers/trip.controller");

const protect = require("../middleware/auth.middleware");
router.post("/", protect, createTrip);
router.get("/", protect, getUserTrips);

router.put("/:id/add-activity", protect, addActivity);
router.put("/:id/remove-activity", protect, removeActivity);
router.put("/:id/regenerate-day", protect, regenerateDay);
router.get("/dashboard", protect, getDashboardTrips);

router.get("/:id", protect, getTripById);
module.exports = router;
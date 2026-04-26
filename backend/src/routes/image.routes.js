const express = require("express");
const router = express.Router();

const getDestinationImage = require("../services/image.service");

router.get("/:destination", async (req, res) => {
  try {
    const data = await getDestinationImage(req.params.destination);

    if (!data || !data.imageUrl) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.redirect(data.imageUrl);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
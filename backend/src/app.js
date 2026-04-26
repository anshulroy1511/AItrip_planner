const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/trips", require("./routes/trip.routes"));
app.use("/api/images", require("./routes/image.routes"));

module.exports = app;
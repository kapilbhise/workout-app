require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);




// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    if (process.env.NODE_ENV == "production") {
      app.use(express.static("frontend/build"));
      const path = require("path");
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "frontend", "build", "index.html")
        );
      });
    }
    app.listen(process.env.PORT || 4000, () => {
      console.log("listening for requests on port", process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

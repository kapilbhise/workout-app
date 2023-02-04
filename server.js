require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");
const path = require("path");

// express app
const app = express();

// middleware
app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/notes", noteRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB...");
    // listen to port

    if (process.env.NODE_ENV == "production") {
      const __dirname = path.resolve();
      app.use(express.static(path.join(__dirname, "/frontend/build")));
      app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
      );
      // app.use(express.static("frontend/build"));

      // app.get("*", (req, res) => {
      //   res.sendFile(
      //     path.resolve(__dirname, "frontend", "build", "index.html")
      //   );
      // });
    }
    // listening the request only after connected to database
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server started on port:", process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 3004;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (HTML, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Mongoose schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  university: String,
  course: String
});

const Student = mongoose.model("Student", studentSchema);

// POST route to handle form submission
app.post("/submit", (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    studentId: req.body.studentId,
    university: req.body.university,
    course: req.body.course
  });

  newStudent.save()
    .then(() => {
      console.log("📦 Student data saved:", newStudent);
      res.send("✅ Student data saved successfully!");
    })
    .catch(err => {
      console.error("❌ Error saving data:", err);
      res.status(400).send("Error saving data: " + err);
    });
});

// GET route for /submit to avoid "Cannot POST" error when visited directly
app.get("/submit", (req, res) => {
  res.send("⚠️ This route only supports POST requests. Please fill and submit the form from the homepage.");
});

// Optional: future route to view submitted students (for browser)
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students); // For now, return JSON. You can render HTML later.
  } catch (err) {
    res.status(500).send("Error retrieving students: " + err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

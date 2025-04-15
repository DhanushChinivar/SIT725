const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  university: String,
  course: String
});

module.exports = mongoose.model('Student', studentSchema);
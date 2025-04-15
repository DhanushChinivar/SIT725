const Student = require('../models/student');

exports.registerStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.redirect('/register?success=true');
  } catch (err) {
    res.status(500).send('Error saving student: ' + err.message);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Error fetching students: ' + err.message);
  }
};
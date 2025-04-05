const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', (req, res) => res.render('home'));
router.get('/register', (req, res) => res.render('register'));
router.get('/programs', (req, res) => res.render('programs'));
router.get('/about', (req, res) => res.render('about'));

router.post('/submit', studentController.registerStudent);
router.get('/students', studentController.getAllStudents);

module.exports = router;
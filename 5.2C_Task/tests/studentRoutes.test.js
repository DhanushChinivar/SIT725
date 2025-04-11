const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const Student = require('../models/student');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Student Registration Routes', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/studentDBTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should render the registration page', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should create a new student entry', (done) => {
    const student = {
      name: 'Test User',
      studentId: 'S123456',
      university: 'Test University',
      course: 'Test Course'
    };

    chai.request(app)
      .post('/submit')
      .send(student)
      .end((err, res) => {
        expect(res).to.redirect;
        done();
      });
  });

  it('should retrieve all students', async () => {
    const res = await chai.request(app).get('/students');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
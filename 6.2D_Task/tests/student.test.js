
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const Student = require('../models/student');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Student Registration API - Basic Tests', () => {
  beforeEach(async () => {
    await Student.deleteMany();
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should register a new student', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({
        name: 'Alice',
        studentId: 'S1001',
        university: 'Deakin',
        course: 'Cybersecurity'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should fetch all registered students', async () => {
    await Student.create({
      name: 'John Doe',
      studentId: 'S1002',
      university: 'Deakin',
      course: 'IT'
    });

    const res = await chai.request(app).get('/students');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('name', 'John Doe');
  });
});

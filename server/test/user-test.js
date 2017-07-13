const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const models = require('../models');

const should = chai.should();
chai.use(chaiHttp);

const USERS_URL = '/api/users';

const newUser = {
  email: 'myyusuf1911@gmail.com',
  password: 'password',
  name: 'User 1',
};

describe('Test for user', function() {

  beforeEach(function(done) {
    const query = { where: {} };
    models.User.destroy(query)
    .then((err) => {
      if (err) return done(err);
      done();
    });
  });

  it('should create user without err', function(done) {
    chai.request(app)
    .post(USERS_URL)
    .send(newUser)
    .end((err, res) => {
      console.log(err);
      should.not.exist(err);
      res.should.have.status(200);
      done();
    });
  });
});
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;
const app = require('../server');

describe('Email controller', function () {
  describe('GET /all-email-combinations', function () {
    it('should return 200 OK with several emails', async function () {
      const response = await request(app)
        .get('/all-email-combinations')
        .expect(200)
        .expect('Content-Type', /json/);

      const emails = response.body;

      expect(emails).to.be.an('array');
    });

    it('it does not add a new email combination with first name, last name and invalid domain', async () => {
      await request(app)
        .post('/email-combination')
        .send({ firstName: 'John', lastName: 'Prat', url: 'http://example.com' })
        .expect(204)
    });

    it('it does not add a new email combination without first name, last name and url', async () => {
      await request(app)
        .post('/email-combination')
        .send({ })
        .expect(422)
    });

    it('add a new email combination with valid domain', async () => {
      const response = await request(app)
        .post('/email-combination')
        .send({ firstName: 'Ben', lastName: 'Pratt', url: '8returns.com' })
        .expect(200)

      const email = response.body;

      expect(email).to.be.an('object');
    });
  });
});

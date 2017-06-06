const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const server = require('../app');
const Author = require('../models/author');

var dataId = "";

describe('Authors', () => {
  after((done) => {
    Author.remove({}, (err) => {
      done();
    });
  });

  it('should successfully create a user', (done) => {
    chai.request(server)
      .post('/api/authors')
      .send({
        name: 'Shabrina V. Inmas',
        username: 'ingelieur',
        password: '123456789',
        email: 'shabrina@virta.com'
      })
      .end((err,res) => {
        if (err) done(err);
        else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('password');
          expect(res.body).to.have.property('email');
          expect(res.body.name).to.equal('Shabrina V. Inmas');
          expect(res.body.email).to.equal('shabrina@virta.com');
          done();
        }
      });
  });

  it('should successfully save an author', (done) => {
    chai.request(server)
      .get('/api/authors')
      .end((err,res) => {
        if (err) done(err);
        else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf(1);
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0].name).to.equal('Shabrina V. Inmas');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0].username).to.equal('ingelieur');
          expect(res.body[0]).to.have.property('email');
          expect(res.body[0].email).to.equal('shabrina@virta.com');
          dataId = res.body[0]._id;
          done();
        }
      });
  });

  it('should sucessfully update an author', (done) => {
    chai.request(server)
      .put(`/api/authors/${dataId}`)
      .send ({
        name: 'Shabrina Virta Inmas'
      })
      .end((err,res) => {
        if (err) done(err);
        else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.name).to.equal('Shabrina V. Inmas');
          done();
        }
      });
  });

  it('should successfully delete an author', (done) => {
    chai.request(server)
      .delete(`/api/authors/${dataId}`)
      .end((err,res) => {
        if (err) done(err);
        else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body.name).to.equal('Shabrina Virta Inmas');
          expect(res.body.username).to.equal('ingelieur');
          done();
        }
      });
  });

  it('should successfully signin', (done) => {
    chai.request(server)
      .post('/signup')
      .send({
        username: 'ingelieur',
        password: '123456789',
        name: 'Shabrina V. Inmas',
        email: 'shabrina@virta.com'
      })
      .end((err,res) => {
          chai.request(server)
            .post('/signin')
            .send({
              username: 'ingelieur',
              password: '123456789'
            })
            .end((err, res) => {
              console.log('hmmm');
              console.log(res.body);
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('token');
              done();
            });
      });
  });
});

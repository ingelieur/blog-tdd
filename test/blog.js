const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const server = require('../app');
const Article = require('../models/article');

var dataId = "";

describe('Articles', () => {
  after((done) => {
    Article.remove({}, (err) => {
      done();
    });
  });

  describe('POST api/articles', () => {
    it('should successfully post an article', (done) => {
      chai.request(server)
        .post('/api/articles')
        .send({
          title: 'Hacktiv8 Hell',
          content: 'Everyday is winter day at Hacktiv8. Cold, hungry, lonely, but still lovely. Pure curiosity, taking leap of faith, like the snow, wandering from the comfy sky to our sinful earth.',
          author: 'Shabrina V. Inmas'
        })
        .end((err,res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('content');
            expect(res.body).to.have.property('author');
            done();
          }
        });
    });
  });

  describe('GET api/articles', () => {
    it('should successfully save an article', (done) => {
      chai.request(server)
        .get('/api/articles')
        .end((err,res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].title).to.equal('Hacktiv8 Hell');
            expect(res.body[0].author).to.equal('Shabrina V. Inmas');
            dataId = res.body[0]._id;
            done();
          }
        });
    });
  });

  describe('DELETE api/articles', () => {
    it('should successfully delete an article', (done) => {
      chai.request(server)
        .delete(`/api/articles/${dataId}`)
        .end((err,res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('content');
            expect(res.body.title).to.equal('Hacktiv8 Hell');
            expect(res.body.author).to.equal('Shabrina V. Inmas');
            done();
          }
        });
    });
  });

  describe('POST signin', () => {
    it('should successfully sign a user in', (done) => {
      done();
    });
  });
});

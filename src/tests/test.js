import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import startServer from '../app';

chai.use(chaiHttp);
chai.should();


describe("Students", () => {
  describe("GET /", () => {

    it("should get all students record", async () => {

      let server = await startServer();

      const res = await chai.request(server).get('/api/games?league=mlb');
      chai.expect(typeof res.body).to.equal('object');
      chai.expect(res.body.league).to.equal('MLB');



    }).timeout(10000);

  });
});
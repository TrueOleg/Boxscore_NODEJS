import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import startServer from '../app';

chai.use(chaiHttp);
chai.should();
let server;


describe("Students", () => {
  describe("GET /", () => {

    it("should get all students record", async (done) => {
      try {
        server = await startServer();
        console.log('test1', server);

        await chai.request(server)
          .get('/api/games?league=mlb')
          .end((err, res) => {
            console.log('res', res.error);

          });
      } catch (err) {
        console.log('error', err);
      }


    });

  });
});
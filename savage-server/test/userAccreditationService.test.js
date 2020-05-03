const UserAccreditation = require("../models/userAccreditation");
const server = require('../app');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe.only('Clear userAccreditation collection', () => {
    beforeEach((done) => { //Before each test we empty the database
        UserAccreditation.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/POST userAccreditation', () => {
        it('it should POST userAccreditation model', (done) => {
            chai.request(server)
                .post('/userAccreditation')
                .send([
                    {
                        "info": {
                            "name": "Jorshua Agastins",
                        },
                        "form": [],
                        "state ": {},
                        "upload ": {},
                    }
                ])
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe.only('Add userAccreditation, then check if it saved', () => {
    it('it should POST userAccreditation model with name "Jorshua Agastins"', (done) => {
        chai.request(server)
            .post('/userAccreditation')
            .send([
                {
                    "info": {
                        "name": "Jorshua Agastins",
                    },
                    "form": [],
                    "state ": {},
                    "upload ": {},
                }
            ])
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should GET all user accreditaions and has specific userAccreaditaion with name "Jorshua Agastins"', (done) => {
        chai.request(server)
            .get('/userAccreditationList')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].info[0].name.should.include("Jorshua Agastins");
                done();
            });
    });
});
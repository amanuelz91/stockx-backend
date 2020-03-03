process.env.NODE_ENV = 'test';
// process.env.NODE_ENV = 'development';
var knex = require('../database/knex');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('API Routes', function() {
    beforeEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run()
                .then(function() {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            done();
        });
    });

    describe('GET /shoes', function() {
        it('should return all shoes', function(done) {
            chai.request(server)
            .get('/shoes')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('array');
                res.body.length.should.equal(2);
                res.body[0].should.have.property('id');
                res.body[0].id.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Yeezy');
                res.body[0].should.have.property('true_to_size_avg');
                res.body[0].true_to_size_avg.should.equal("3.00");
                res.body[0].should.have.property('count');
                res.body[0].count.should.equal(1);
                done();
            });
        });
    });

    describe('POST new shoe true to size to /shoes', function() {
        it('should update average true to size of shoe', function(done) {
            chai.request(server)
            .post('/shoes/true_to_size?true_to_size=3&name=yeezy')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.length.should.equal(1);
                res.body[0].should.have.property('id');
                res.body[0].id.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Yeezy');
                res.body[0].should.have.property('true_to_size_avg');
                res.body[0].true_to_size_avg.should.equal("3.00");
                done();
            })
        })
    })

});
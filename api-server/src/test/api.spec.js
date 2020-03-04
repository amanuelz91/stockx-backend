process.env.NODE_ENV = 'test';
var knex = require('../database/knex');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);
console.log('process node env ',process.env.NODE_ENV)
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

    describe('GET /shoes?shoeName=yeezy', function() {
        it('should return Specified shoe', function(done) {
            chai.request(server)
            .get('/shoes?shoeName=yeezy')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; 
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
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


    describe('GET /shoes', function() {
        it('should return All shoes', function(done) {
            chai.request(server)
            .get('/shoes')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; 
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

    describe('POST /shoes', function() {
        it('should update average true to size of shoe', function(done) {
            chai.request(server)
            .post('/shoes/true_to_size?true_to_size=3&shoeName=yeezy') 
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

    describe('Throw Error POST /shoes (for input "shoeName")', function() {
        it('POST /shoes should throw error when bad input paramaters are supplied for shoeName', function(done) {
            chai.request(server)
            .post('/shoes/true_to_size?true_to_size=3&shoeName=wrongInput')
            .end(function(err, res) {
                res.should.have.status(500)
            })
            done();
        })
    })

    describe('Throw Error POST /shoes (for input "true_to_size")', function() {
        it('POST /shoes should throw error when bad input paramaters are supplied for true_to_size', function(done) {
            chai.request(server)
            .post('/shoes/true_to_size?true_to_size=7&shoeName=wrongInput')
            .end(function(err, res) {
                res.should.have.status(500)
            })
            done();
        })
    })

    describe('Throw Error GET /shoes (for input "shoeName")', function() {
        it('GET /shoes should throw error when bad input paramater is supplied for shoeName ', function(done) {
            chai.request(server)
            .get('/shoes?shoeName=badInput')
            .end(function(err, res) {
                res.should.have.status(500)
            })
            done();
        })
    })

});
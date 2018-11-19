const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blogue');
var db = mongoose.connection
chai.use(chaiHttp)

var expect = chai.expect


describe('User testing :', function(){
    describe('register test:', function(){
        it('if username or email or password is empty: Invalid input, response status 400', function(done){
            let user = {
                name: 'abduh',
                email: '',
                password: '',
                role: ''
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(400)
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.equal('Invalid input')
                    done()
                })            
        })
    })
})

describe('User testing:', function(){
    describe('register testing:', function(){
        it('if email does not valid or password length less than 8 characters must return message : Invalid input, status 400', function(done){
            let user = {
                name: 'abduh', 
                email : 'abduhmailcom',
                password : '123'
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(400)
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.equal('Invalid input')
                    done()
                })
        })
    })
})

describe('User testing:', function(){
    describe('User register and login testing that required dummy data in database:', function(){
        this.beforeEach(function(){
            let user = new User({
                name: 'test1',
                email: 'test1@mail.com',
                password: '12345678'
            })
            user.save()
        })
        this.afterEach(function(){
            db.dropCollection('users', function(err){
                if(err) console.log(err)
            })
        })
        it('if email is already exists must return message : Email is already exists, please pick another, status 400', function(done){
            let user = {
                name: 'test1',
                email: 'test1@mail.com',
                password: '12345678'
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(400)
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.equal('Email is already exists, please pick another')
                    done()
                })
        })

        it('if email does not match with any records in database must return: Email doesn\'t match with our records, status 400', function(done){
            let user = {
                email: 'test2@gmail.com',
                password: '12345678'
            } 
            chai.request(app)
                .post('/login')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(400)
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.equal('Email doesn\'t match with our records')
                    done()
                })
        })

        it('if email and password missmatch must return: Email and password missmatch, status 400', function(done){
            let user = {
                email: 'test1@mail.com',
                password: 'lalalala'
            }

            chai.request(app)
                .post('/login')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(400)
                    expect(response.body).to.have.property('message')
                    expect(response.body.message).to.equal('Email and password missmatch')
                    done()
                })
        })

        it('if login succeeded must return reponse body that have name and token jwt, status 200', function(done){
            let user = {
                email: 'test1@mail.com',
                password: '12345678'
            }

            chai.request(app)
                .post('/login')
                .send(user)
                .end((error, response)=>{
                    expect(response).to.have.status(200)
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('token')
                    done()
                })
        })
    })
})

const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should add a new todo', (done) => {
        let todoTitle = 'Dummy test todo title';

        request(app)
            .post('/todos')
            .send({ title: todoTitle })
            .expect(200)
            .expect((response => {
                expect(response.body.title).toBe(todoTitle) 
            }))
            .end(done)
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({ notTitle: 'Dummy test todo title' })
            .expect(400)
            .end(((error, response) => {
                if (error) return done(error);

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                })
                .catch(error => {
                    done(error);
                });
            }))
    })
})

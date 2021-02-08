import request from 'supertest';
import { app } from '../../app';

it('return a 201 on signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);
});

it('return a 400 on invalid signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: '12345',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1245',
    })
    .expect(400);
});

it('reject same emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'xyz',
    })
    .expect(400);
});

it('getting a cookie after signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});

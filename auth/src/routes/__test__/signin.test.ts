import request from 'supertest';
import { app } from '../../app';

beforeEach(async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: '12345',
  });
});

it('return a 201 on signin', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);
});

it('return a 400 on invalid signin', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test1.com',
      password: '12345',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1245',
    })
    .expect(400);
});

it('getting a cookie after signin', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});

import request from 'supertest';
import { app } from '../../app';

it('get the current user data', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);

  const getCookie = res.get('Set-Cookie');
  const userDataRes = await request(app).get('/api/users/currentuser').set('Cookie', getCookie).expect(200);
  expect(userDataRes.body.currentUser.email).toEqual('test@test.com');
});

it('unauthorized current user', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(201);

  const userDataRes = await request(app).get('/api/users/currentuser').expect(400);
  expect(userDataRes.body.errors[0].message).toEqual('Not Authorized');
});

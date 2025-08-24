const request = require('supertest');
const app = require('../app');
const DB = require('../database');
const { TABLES } = require('../utils');

const url = '/api/v1/auth';
const email = 'test.reg@mail.com';
const password = 'Qwerty@11';
let refreshToken;

describe('Auth', () => {
  afterAll(async () => {
    // Clean data
    await DB(TABLES.USER).where({ email }).del();
  });

  it('Register', async () => {
    const response = await request(app)
      .post(`${url}/register`)
      .send({
        email,
        name: 'Tester',
        password,
        password_confirmation: password
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
  });

  it('Register password is not strong (-)', async () => {
    const response = await request(app)
      .post(`${url}/register`)
      .send({
        email,
        name: 'Tester',
        password: '11223344',
        password_confirmation: '11223344'
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.status).toEqual(false);
    expect(response.body).toHaveProperty('errors');
  });

  it('Login wrong password (-)', async () => {
    const response = await request(app)
      .post(`${url}/login`)
      .send({
        email,
        password: '12345678'
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.status).toEqual(false);
    expect(response.body).toHaveProperty('message');
  });

  it('Login', async () => {
    const response = await request(app)
      .post(`${url}/login`)
      .send({
        email,
        password,
        remember_me: false
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
    expect(response.body.data).toHaveProperty('access_token');

    refreshToken = response.body.data.refresh_token;
  });

  it('Login with remember me', async () => {
    const response = await request(app)
      .post(`${url}/login`)
      .send({
        email,
        password,
        remember_me: true
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
    expect(response.body.data).toHaveProperty('access_token');
  });

  it('Refresh Token', async () => {
    const response = await request(app)
      .post(`${url}/refresh-token`)
      .send({
        refresh_token: refreshToken
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
    expect(response.body.data).toHaveProperty('access_token');
  });
});

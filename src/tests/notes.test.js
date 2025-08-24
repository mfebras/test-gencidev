const request = require('supertest');
const app = require('../app');
const { getJwt, notePayload, getNote } = require('./factories');

const url = '/api/v1/notes';
let auth;
let token;

describe('Note', () => {
  beforeAll(async () => {
    auth = await getJwt();
    token = auth.access_token;
  });

  it('Get', async () => {
    const response = await request(app)
      .get(url)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
    expect(response.body.data).toHaveProperty('list');
    expect(response.body.data).toHaveProperty('total_rows');
  });

  it('Store', async () => {
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(notePayload())
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
  });

  it('Store - title is too long', async () => {
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(notePayload(false))
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.status).toEqual(false);
  });

  it('Update', async () => {
    const note = await getNote(auth?.user?.id);

    const response = await request(app)
      .put(`${url}/${note.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(notePayload())
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
  });

  it('Delete', async () => {
    const note = await getNote(auth?.user?.id);

    const response = await request(app)
      .delete(`${url}/${note.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(notePayload())
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toEqual(true);
  });
});

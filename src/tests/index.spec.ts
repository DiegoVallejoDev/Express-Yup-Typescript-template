import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp, errorHandler } from '../app';
import { personUtils } from '../utils/personUtils';

describe('API routes', () => {
  const app = createApp();

  it('responds to GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello World!');
  });

  it('returns a greeting for a person', async () => {
    const response = await request(app).get('/hello?name=John');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello John');
  });

  it('includes age in a greeting', async () => {
    const response = await request(app).get('/hello?name=John&age=20');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello John you are 20 years old');
  });

  it('returns validation details when name is missing', async () => {
    const response = await request(app).get('/hello');

    expect(response.status).toBe(400);
    expect(response.body.error.type).toBe('validation_error');
    expect(response.body.error.details).toContain('query.name is a required field');
  });

  it('returns JSON for an unknown route', async () => {
    const response = await request(app).get('/unknown');

    expect(response.status).toBe(404);
    expect(response.body.error.type).toBe('not_found');
  });

  it('returns 500 when a route throws an error', async () => {
    const throwingApp = express();
    throwingApp.get('/error', () => {
      throw new Error('test failure');
    });
    throwingApp.use(errorHandler);

    const response = await request(throwingApp).get('/error');

    expect(response.status).toBe(500);
    expect(response.body.error.type).toBe('internal_error');
    expect(response.body.error.message).toBe('Internal server error');
  });
});

describe('personUtils', () => {
  it('formats a person with an age', () => {
    expect(personUtils({ name: 'Jane', age: 30 })).toBe(
      'Hello Jane you are 30 years old',
    );
  });
});

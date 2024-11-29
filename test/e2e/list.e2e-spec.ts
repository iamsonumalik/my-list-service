import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('ListController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /list/add', () => {
    it('should add an item to the list', async () => {
      const response = await request(app.getHttpServer())
        .post('/list/add')
        .set('x-user-id', '67499ff988072556ce982539')
        .send({ itemId: '67499ff988072556ce982543', type: 'Movie' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'itemId',
        '67499ff988072556ce982543',
      );

      // await request(app.getHttpServer())
      //   .delete(`/list/${response.body._id}`)
      //   .set('x-user-id', '67499ff988072556ce982539');
    });

    it('should return 400 for duplicate items', async () => {
      await request(app.getHttpServer())
        .post('/list/add')
        .set('x-user-id', '67499ff988072556ce982539')
        .send({ itemId: '67499ff988072556ce982543', type: 'Movie' });

      const response = await request(app.getHttpServer())
        .post('/list/add')
        .set('x-user-id', '67499ff988072556ce982539')
        .send({ itemId: '67499ff988072556ce982543', type: 'Movie' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Item already exists in your list.');
    });

    it('should return 400 if item does not exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/list/add')
        .set('x-user-id', '67499ff988072556ce982539')
        .send({ itemId: 'nonexistentItem', type: 'Movie' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Item not found.');
    });
  });

  describe('GET /list/all', () => {
    it('should return all items in the list', async () => {
      const response = await request(app.getHttpServer())
        .get('/list')
        .set('x-user-id', '67499ff988072556ce982539')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.items.length).toBeGreaterThan(0);
    });

    it('should return an empty list if no items are found', async () => {
      const response = await request(app.getHttpServer())
        .get('/list')
        .set('x-user-id', 'emptyUser');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'User not found.',
        error: 'Unauthorized',
        statusCode: 401,
      });
    });
  });

  describe('DELETE /list/:id', () => {
    it('should remove an item from the list', async () => {
      const res = await request(app.getHttpServer())
        .post('/list/add')
        .set('x-user-id', '67499ff988072556ce982539')
        .send({ itemId: '67499ff988072556ce982544', type: 'Movie' });

      const response = await request(app.getHttpServer())
        .delete(`/list/${res.body._id}`)
        .set('x-user-id', '67499ff988072556ce982539');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
    });

    it('should return a BadRequestException if item ID is invalid or not found', async () => {
      const mockUserId = '67499ff988072556ce982539'; // Mock user ID
      const mockItemId = 'invalid-item-id'; // Simulate invalid item ID

      const response = await request(app.getHttpServer())
        .delete(`/list/${mockItemId}`)
        .set('x-user-id', mockUserId); // Simulate the user ID in the request

      expect(response.status).toBe(400); // Expect a BadRequestException
      expect(response.body).toEqual({
        message: 'Invalid id.',
        error: 'Bad Request',
        statusCode: 400,
      }); // Error message format for invalid ID
    });
  });
});

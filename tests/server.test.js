const request = require('supertest');
const app = require('../server'); 
const path = require('path');

describe('GET /', () => {
    it('should return 200 OK for the URL http://localhost:5000/', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.statusCode).toBe(200);
    });

    it('should contain the site name "Darkroom"', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.text).toContain('Darkroom');
    });

    it('should contain the text "MILESTONE"', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.text).toContain('MILESTONE');
    });
});
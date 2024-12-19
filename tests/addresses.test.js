const request = require('supertest');
const app = require('../server'); 

let token;  

beforeAll(async () => {
  
});

describe('API Endpoints - Addresses', () => {
    test('GET /addresses - Debería devolver todas las direcciones', async () => {
        const res = await request(app)
            .get('/addresses')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('POST /addresses - Debería crear una nueva dirección', async () => {
        const newAddress = {
            firstName: 'Juan',
            lastName: 'Pérez',
            middleName: 'Carlos',
            address: 'Calle Falsa 123',
            email: 'juan@example.com',
        };
        const res = await request(app)
            .post('/addresses')
            .set('Authorization', `Bearer ${token}`)
            .send(newAddress);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    test('PUT /addresses/:id - Debería actualizar una dirección existente', async () => {
        const updatedData = { address: 'Calle Verdadera 456' };
        const res = await request(app)
            .put('/addresses/1')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);
        expect(res.statusCode).toEqual(200);
    });

    test('DELETE /addresses/:id - Debería eliminar una dirección', async () => {
        const res = await request(app)
            .delete('/addresses/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });
});

import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Books & Lends API',
        description: 'API for managing books and their lending records',
        version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);

import swaggerAutogen from 'swagger-autogen';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputFile = resolve(__dirname, 'swagger-output.json');
const schemas = {
  Task: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' },
      title: { type: 'string', example: 'My Task' },
      description: { type: 'string', example: 'Task description' },
      createdAt: { type: 'string', format: 'date-time' },
      dueDate: { type: 'string', format: 'date-time' },
      completedAt: { type: 'string', format: 'date-time' },
    },
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'julian@notmy.mail' },
      password: { type: 'string', example: 'julian' },
    },
  },
  VerifyRequest: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', example: 'julian@notmy.mail' },
    },
  },
  TaskRequest: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', example: 'My Task' },
      description: { type: 'string', example: 'Task description' },
      dueDate: {
        type: 'string',
        format: 'date-time',
        example: '2026-12-31T23:59:59.000Z',
      },
      completedAt: { type: 'string', format: 'date-time', example: '' },
    },
  },
  Message: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
};

const doc = {
  info: {
    title: 'Tasks API',
    description: 'API for managing tasks with session-based authentication',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:3000' }],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    {
      name: 'Tasks',
      description: 'Task management endpoints (requires login)',
    },
  ],
};

const routes = ['./index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
  const spec = JSON.parse(readFileSync(outputFile, 'utf-8'));
  spec.components = { schemas };
  writeFileSync(outputFile, JSON.stringify(spec, null, 2));
  console.log('Schemas patched.');
});

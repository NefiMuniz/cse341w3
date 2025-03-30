const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Missionary = require('../models/Missionary');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Project2 API',
      version: '1.0.0',
      description: 'API for managing missionaries and classes',
    },
    servers: [
      {
        url: 'https://project-2-iwcv.onrender.com',
        description: 'Render server',
      },
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Local server',
      },
  ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        Missionary: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '67dcc0a5a396990a3760d6bc'},
            firstName: { type: 'string', example: 'Nefi' },
            lastName: { type: 'string', example: 'Muniz' },
            whatsapp: { type: 'string', example: '+557799999999' },
            gender: { type: 'string', enum: ['M', 'F'], example: 'M' },
            englishFluent: { type: 'string', enum: ['Yes', 'No'], example: 'Yes' },
            missionStart: { type: 'string', format: 'date', example: '01/01/2020' },
            missionEnd: { type: 'string', format: 'date', example: '01/01/2022' },
            pretitle: { type: 'string', enum: ['Elder', 'Sister'], example: 'Elder'},
          },
        },
        UpdateMissionary: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'Nefi' },
            lastName: { type: 'string', example: 'Muniz' },
            whatsapp: { type: 'string', example: '+557799999999' },
            gender: { type: 'string', enum: ['M', 'F'], example: 'M' },
            englishFluent: { type: 'string', enum: ['Yes', 'No'], example: 'Yes' },
            missionStart: { type: 'string', format: 'date', example: '01/01/2020' },
            missionEnd: { type: 'string', format: 'date', example: '01/01/2022' },
          },
        },
        Class: {
          type: 'object',
          properties: {
            class: { type: 'string', enum: ['EC3', 'PC101', 'PC102', 'PC103'] },
            day: { type: 'string', enum: ['tuesday', 'wednesday', 'thursday', 'saturday'] },
            zoomLink: { type: 'string' },
            zoomPass: { type: 'string' },
            assignedTo: { type: 'string', description: 'ID of the assigned missionary' },
          },
        },
        MissionaryResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Request fulfilled successfully!'
            },
            data: {
              $ref: '#/components/schemas/Missionary'
            }
          }
        }
      },
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
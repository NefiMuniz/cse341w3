const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
      schemas: {
        Missionary: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            whatsapp: { type: 'string' },
            gender: { type: 'string', enum: ['M', 'F'] },
            englishFluent: { type: 'string', enum: ['Yes', 'No'] },
            missionStart: { type: 'string', format: 'date' },
            missionEnd: { type: 'string', format: 'date' },
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
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
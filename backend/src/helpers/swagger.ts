import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ticketback Backend',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:8080/ticketback',
                description: 'Local server',
            },
            {
                url: 'https://backttticket-a3eeawgkhqhpafbm.eastus2-01.azurewebsites.net/ticketback',
                description: 'Production server',
            },
        ],
        tags: [
            // {
            //     name: 'Login',
            //     description: 'Operations related to login'
            // },
            // {
            //     name: 'Users',
            //     description: 'Operations related to users'
            // },
            // {
            //     name: 'Companies',
            //     description: 'Operations related to companies'
            // }
        ],
    },
    // apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts',
        './dist/routes/*.js',
        './dist/controllers/*.js'
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
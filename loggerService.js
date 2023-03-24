/**
@loggerService.js Copyright(c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
**/

// Importing the pino and dotenv modules.
const pino = require('pino');
const dotenv = require('dotenv');

dotenv.config();

const today = new Date();
const filenamelog = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.log`;

// Exporting the pino module.
module.exports = pino({
    level: process.env.PINO_LOG_LEVEL || 'info',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                level: 'trace',
                options: {
                    colorize: true,
                    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                }
            },
            {
                target: 'pino/file',
                level: 'trace',
                options: {
                    // destination: './logs/main.log',
                    destination: `./logs/${filenamelog}`,
                    mkdir: true,
                }
            }
        ]
    },
});
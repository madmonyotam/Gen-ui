/* eslint-disable no-undef */
const path = require('path');
const gen = require('mocking_g');

const rootFolder = path.resolve(__dirname, '../');

gen.schemas.setPath(`${rootFolder}/mockSchema`);

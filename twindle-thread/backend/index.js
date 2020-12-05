// @ts-check
const express = require('express');
const bodyParser = require('body-parser');

const { addThread } = require('./src/add-thread');
const { getThreadData } = require('./src/get-thread-data');
const { getThreadsLists } = require('./src/get-threads-list');

require('dotenv').config();

const port = 3800;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`API listening at port ${port}`);
});

app.get('/threads/:id', getThreadData);
app.get('/threads/', getThreadsLists);

app.post('/threads/', addThread);

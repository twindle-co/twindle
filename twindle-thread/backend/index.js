// @ts-check

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { addThread } = require('./src/add-thread');
const { getThreadData } = require('./src/get-thread-data');
const { getThreadsLists } = require('./src/get-threads-list');

const port = 3800;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
  })
);

app.listen(port, () => {
  console.log(`API listening at port ${port}`);
});

app.get('/threads/:id', getThreadData);
app.get('/threads/', getThreadsLists);

app.post('/threads/', addThread);

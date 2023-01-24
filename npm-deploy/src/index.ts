#!/usr//bin/env node
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hio ');
});

app.listen(3005, () => {
  console.log('Listening port on 3005');
});

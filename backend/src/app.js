import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

export { app };

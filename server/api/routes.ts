import express from 'express';
import formData from './formData.ts';

const optionsData = [
  { text: 'Text 1', value: '1' },
  { text: 'Text 2', value: '2' },
  { text: 'Text 3', value: '3' },
];

const app = express();

app.route('/formdata/')
  .get((req, res) => {
    // console.log('get formdata: ', formData.data);
    res.send(formData.data.task_data);
  })
  .post((req, res) => {
    formData.data = req.body;
    // console.log('post formdata: ', formData.data);
    res.status(200).send();
  });
app.route('/optionsdata/')
  .get((req, res) => {
    res.send(optionsData);
  });

export default app;

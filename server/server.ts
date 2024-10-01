import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routers from './api/routes.ts';
import handleUpload from './api/form.ts';
import nodeFormData from './api/formData.ts';

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

const nodeApp = express();

// const __dirname = dirname(require.main.filename);

// set the view engine to ejs
nodeApp.set('views', path.join(__dirname, '/views'));
nodeApp.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);

nodeApp.set('port', (process.env.PORT || isProduction ? 8080 : 5005));

nodeApp.use(bodyParser.json());
nodeApp.use(bodyParser.urlencoded({
  extended: true,
}));

if (isProduction) {
  nodeApp.use(express.static(`${__dirname}/../dist`));
}

nodeApp.use('/api/', routers);

const fixLabelLink = (data) => {
  const taskData = data.taskData.map((x) => ({
    ...x,
  }));
  for (let i = 0; i < taskData.length; i++) {
    if (data.taskData[i].label) {
      taskData[i].label = taskData[i].label.replace(/"/g, '\\"');
    }
    if (data.taskData[i].component) {
      taskData[i].component = null;
    }
  }
  return { taskData };
};

nodeApp.route('/api/form/')
  .get((req, res) => {
    const data = fixLabelLink(nodeFormData.data);
    // console.log('get form: ', data);
    // console.log('get form answers: ', formData.answers);
    res.render('index', {
      data: JSON.stringify(data),
      answers: JSON.stringify(nodeFormData.answers),
    });
  })
  .post(handleUpload);

// console.log('NODE_ENV', process.env.NODE_ENV, `${__dirname}/../dist`);

// 404 catch-all handler (middleware)
nodeApp.use((req, res) => {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
nodeApp.use((err, req, res, next) => { // , next: any
  res.status(500);
  res.render('500', { error: err });
  next();
});

nodeApp.listen(nodeApp.get('port'), () => {
  console.log(
    `Express started on http://localhost:${nodeApp.get(
      'port',
    )}; press Ctrl-C to terminate.`,
  );
});

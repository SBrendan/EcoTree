const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const Apicall = require('./apicall');


const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Allow public access to uploaded file
app.use(express.static('uploads'));

//start app
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);

app.get('/consummed-battery', async (req, res) => {
  try {
    new Apicall().getConsummedBattery();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/engine-status', async (req, res) => {
  try {
    new Apicall().getEngineStatus();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/start-mesuring', async (req, res) => {
  try {
    new Apicall().putStartMesuring();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/robot-status', async (req, res) => {
  try {
    new Apicall().getRobotStatus();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/robot-deplacement', async (req, res) => {
  try {
    new Apicall().putRobotDeplacement();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let data = [];

      //loop all files
      _.forEach(_.keysIn(req.files.files), (key) => {
        let file = req.files.files[key];

        //move file to uploads directory
        file.mv('./uploads/' + file.name);

        //push file details
        data.push({
          name: file.name,
          mimetype: file.mimetype,
          size: file.size
        });
      });

      //return response
      res.send({
        status: true,
        message: 'Files are uploaded',
        data: data
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

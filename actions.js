const fs = require('fs');

const Apicall = require('./apicall');
class Actions {

  constructor() {

  }


  cheminSansObstacle() {
    let coordActuelle = { "x": 0, "y": 0 };
    let coordjson = this.fileToJson();
    let coordDesti = { "x": 0, "y": 0 };
    coordjson.forEach((line) => {
      coordDesti.x = line.x - coordActuelle.x;
      coordDesti.y = line.y - coordActuelle.y;
      console.log(coordDesti);
      new Apicall().putRobotDeplacement(coordDesti.x.toString(), coordDesti.y.toString()).then(_ => {
        coordActuelle.x = line.x;
        coordActuelle.y = line.y;
        new Apicall().putStartMesuring(401).then(_ => {
          new Apicall().getRemainingTime().then(function (result) {
            console.log('remainingTime');
            console.log(result);
            _.sleepMs(result);
          });
        });
      });
    });
    new Apicall().getConsummedBattery().then(function (consumedBattery) {
      console.log('consumedBattery');
      console.log(consumedBattery);
      console.log('coordActuelle');
      console.log(coordActuelle);
      return consumedBattery
    });

  }

  fileToJson() {
    let array = [];
    // read contents of the file
    fs.readFile('./uploads/file.txt', { encoding: 'utf8', flag: 'r' },
      function (err, data) {
        if (err)
          console.log(err);
        else {
          // split the contents by new line
          const lines = data.split(/\r?\n/);
          // print all lines
          lines.forEach((line) => {
            let x = parseInt(line.split(' ')[0]);
            let y = parseInt(line.split(' ')[1]);
            array.push({ 'x': x, 'y': y });
          });
        }
      });

    return array
  }

  sleepMs(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
module.exports = Actions;

const fs = require('fs');

const Apicall = require('./apicall');
class Actions {

  constructor() { }

  cheminSansObstacle() {
    let coordActuelle = { "x": 0, "y": 0 };

    // let coordjson = this.fileToJson();
    let coordjson = [];

    this.fileToJson().then(res => {
      coordjson = res;

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
              console.log('remaining time', result);

              const date = Date.now();
              let currentDate = null;
              do {
                currentDate = Date.now();
              } while (currentDate - date < result);
            });
          });

        }).catch(err => {
          console.error(err);
        })
      });

      new Apicall().getConsummedBattery().then(function (consumedBattery) {
        console.log('consumed battery', consumedBattery);
        console.log('coord actuelle', coordActuelle);
        return consumedBattery;
      });
    });
  }

  fileToJson() {
    return new Promise((resolve, reject) => {
      fs.readFile('./uploads/file.txt', { encoding: 'utf8', flag: 'r' }, (err, data) => {
        const lines = data.split(/\r?\n/);
        let array = [];

        // print all lines
        lines.forEach((line) => {
          let x = parseInt(line.split(' ')[0]);
          let y = parseInt(line.split(' ')[1]);
          array.push({ 'x': x, 'y': y });
        });

        resolve(array);
      });
    });
  }
}
module.exports = Actions;

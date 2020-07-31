const fs = require('fs');
const Apicall = require('./apicall');
class Actions {

  constructor() {

  }


  cheminSansObstacle() {
    let coordActuelle = {"x": 0, "y": 0};
    let coordjson = this.fileToJson();
    let coordDesti = {"x": 0, "y": 0};
    coordjson.forEach((line) => {
      coordDesti.x = line.x - coordActuelle.x;
      coordDesti.y = line.y - coordActuelle.y;
      console.log(coordDesti);
      new Apicall().putRobotDeplacement(coordDesti.x.toString(), coordDesti.y.toString()).then(robotDep => {
       coordActuelle.x = line.x;
        coordActuelle.y = line.y;
        new Apicall().putStartMesuring(401).then(startMesur => {
          let remainingTime = new Apicall().getRemainingTime().then(function(result){
            console.log('remainingTime');
            console.log(result);
            this.sleepMs(result);
          });
        });
      });
    });
    let consumed = new Apicall().getConsummedBattery().then(function(consumedBattery){
      console.log('consumedBattery');
      console.log(consumedBattery);
      console.log('coordActuelle');
      console.log(coordActuelle);
  });
  }

  fileToJson() {
    try {
      let array = [];
      // read contents of the file
      const data = fs.readFileSync('./uploads/file.txt', 'UTF-8');
      // split the contents by new line
      const lines = data.split(/\r?\n/);
      // print all lines
      lines.forEach((line) => {
        let x = parseInt(line.split(' ')[0]);
        let y = parseInt(line.split(' ')[1]);
        array.push({'x':x, 'y': y});
      });
      return array
    } catch (err) {
      console.error(err);
    }
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

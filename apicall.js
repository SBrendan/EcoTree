const https = require('https');
const axios = require('axios');

class Apicall {

  constructor() {
    console.log("Apicall start");
  }

  // Désactive la vérification SSL auto-signé
  agent() {
    return new https.Agent({
      rejectUnauthorized: false
    });
  }

  // Création d'une méthode permettant de retourner la consommation énergétique du robot
  // Retourne la valeur de la batterie
  getConsummedBattery() {
    axios.get('https://omega-community.fr/ecotree/robiot-api/configurations/101', { httpsAgent: this.agent() }).then(resp => {
      console.log(resp.data.content);
    }).catch(function(error) {
      console.log("Error : " + error)
    });
  }


  // Création d'une méthode permettant de connaitre le status du robot (Déplacement)
  // Status = moving, stopped
  getEngineStatus() {
    axios.get('https://omega-community.fr:8080/ecotree/robiot-api/configurations/201', { httpsAgent: this.agent() }).then(resp => {
      console.log(resp.data.content);
    }).catch(function(error) {
      console.log("Error : " + error)
    });
  }

  // Création d'une méthode permettant au robot de lancer la mesure
  putStartMesuring(idRobot) {
    // On démarre le robot, ensuite le robot fait ça mesure puis se remet en starting
    // ID DE ROBOT
    axios.put('https://omega-community.fr/ecotree/robiot-api/configurations/401', { id: idRobot, content: 'STARTING' }, { httpsAgent: this.agent() }).then(resp => {
      console.log(resp.data.content);
    }).catch(function(error) {
      console.log("Error : " + error)
    });
  }

  // Retourne le status du robot = STARTING, IN_PROGRESS, READY
  getRobotStatus() {
    axios.get('https://omega-community.fr/ecotree/robiot-api/configurations/401', { httpsAgent: this.agent() }).then(resp => {
      console.log(resp.data.content);
    }).catch(function(error) {
      console.log("Error : " + error)
    });
  }

  // Création d'une méthode permettant de donner une suite d'action au robot (Déplacement)
  // "content": "0.0,0.0"
  putRobotDeplacement(x,y) {
    var coordonnes = x+","+y;
    axios.put('http://omega-community.fr:8080/ecotree/robiot-api/configurations/302', { content: coordonnes }, { httpsAgent: this.agent() }).then(resp => {
      console.log(resp.data.content);
    }).catch(function(error) {
      console.log("Error : " + error)
    });

  }


}

module.exports = Apicall;

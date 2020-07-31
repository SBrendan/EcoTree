const https = require('https');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class Apicall {

  constructor() {
  }

  // Désactive la vérification SSL auto-signé
  agent() {
    const certFile = path.resolve(__dirname + '/ssl/client.crt');
    const keyFile = path.resolve(__dirname + '/ssl/client.key');
    return new https.Agent({
      cert: fs.readFileSync(certFile),
      key: fs.readFileSync(keyFile),
      rejectUnauthorized: false
    });
  }

  // Création d'une méthode permettant de retourner la consommation énergétique du robot
  // Retourne la valeur de la batterie
  getConsummedBattery() {
    return axios.get('https://omega-community.fr/ecotree/robiot-api/configurations/101', { httpsAgent: this.agent() }).then(resp => { return resp.data.content })
      .catch(function (error) {
        console.log("Error : " + error)
      });
  }


  // Création d'une méthode permettant de connaitre le status du robot (Déplacement)
  // Status = moving, stopped
  getEngineStatus() {
    return axios.get('https://omega-community.fr:8080/ecotree/robiot-api/configurations/201', { httpsAgent: this.agent() }).then(resp => {
      return resp.data.content;
    }).catch(function (error) {
      console.log("Error : " + error)
    });
  }

  // Création d'une méthode permettant au robot de lancer la mesure
  putStartMesuring(idRobot) {
    // On démarre le robot, ensuite le robot fait ça mesure puis se remet en starting
    // ID DE ROBOT
    return axios.put('https://omega-community.fr/ecotree/robiot-api/configurations/401', { id: idRobot, content: 'STARTING' }, { httpsAgent: this.agent() }).then(resp => {
      return resp.data.content;
    }).catch(function (error) {
      console.log("Error : " + error)
    });
  }

  // Retourne le status du robot = STARTING, IN_PROGRESS, READY
  getRobotStatus() {
    return axios.get('https://omega-community.fr/ecotree/robiot-api/configurations/401', { httpsAgent: this.agent() }).then(resp => {
      return resp.data.content;
    }).catch(function (error) {
      console.log("Error : " + error)
    });
  }

  // Création d'une méthode permettant de donner une suite d'action au robot (Déplacement)
  // "content": "0.0,0.0"
  putRobotDeplacement(x, y) {
    var coordonnes = x + "," + y;
    return axios.put('http://omega-community.fr:8080/ecotree/robiot-api/configurations/302', { content: coordonnes }, { httpsAgent: this.agent() }).then(resp => {
      return resp.data.content;
    }).catch(function (error) {
      console.log("Error : " + error)
    });
  }

  async getRemainingTime() {
    return axios.get('https://omega-community.fr:8080/ecotree/robiot-api/configurations/402', { httpsAgent: this.agent() }).then(resp => { return resp.data.content })
      .catch(function (error) {
        console.log("Error : " + error)
      });
  }
}

module.exports = Apicall;

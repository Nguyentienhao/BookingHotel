const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const users = require('./routes/users');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const path = require('path');

class Server {
  constructor() {
    this.port = process.env.PORT || 8080;
    this.host = "localhost";

    this.app = express();
    this.http = http.Server(this.app);
  }

  connectDatabase() {
    dotenv.config();
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
      .then(() => { console.log("database is connected") })
      .catch(err => { console.log("error" + err) })
  }

  configServer() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));    
    this.app.use(passport.initialize());
       
    require('./config/passport')(passport);
    this.app.use('/api/users/', users);
    this.app.use(express.static(path.join(__dirname, '.')));
  }

  excuteServer() {
    this.connectDatabase();
    this.configServer();

    this.http.listen(this.port, this.host, () => {
      console.log(`Listening in http://${this.host}:${this.port}`);
    })
  }
}

const server = new Server();

server.excuteServer();
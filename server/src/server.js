const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/api',router); //aqui va la direccion de la api que yo vaya a crear por ahora es localhost/api

module.exports = server;

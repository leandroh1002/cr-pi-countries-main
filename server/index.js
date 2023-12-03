const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const cargarDatos = require('./src/copyData.js')
const PORT = 3001;

cargarDatos()
conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))

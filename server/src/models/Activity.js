const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dificultad: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false,
    },
    Duracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false,
    },
  } , { timestamps: false });
};
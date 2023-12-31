const { server } = require('../src/app');
const session = require('supertest');
const agent = session(server);


const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Modelo de Actividad (Activity)', () => {
  describe('Definición del modelo', () => {
    it('Debe tener las propiedades correctas', async () => {
      const activity = await sequelize.models.Activity.build({
        Nombre: 'Actividad de prueba',
        Dificultad: '3',
        Duracion: 120,
        Temporada: 'Verano',
      });

      expect(activity).toHaveProperty('id');
      expect(activity).toHaveProperty('Nombre', 'Actividad de prueba');
      expect(activity).toHaveProperty('Dificultad', '3');
      expect(activity).toHaveProperty('Duracion', 120);
      expect(activity).toHaveProperty('Temporada', 'Verano');
    });
  });

  describe('Validación de campos', () => {
    it('Debe fallar si se intenta crear una actividad sin Nombre', async () => {
      await expect(
        sequelize.models.Activity.create({
          Dificultad: '3',
          Duracion: 120,
          Temporada: 'Verano',
        })
      ).rejects.toThrowError();
    });
  });
});

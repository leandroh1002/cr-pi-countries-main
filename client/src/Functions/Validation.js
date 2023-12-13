const validate = (userData) => {
  const errors = {};

  if (!userData.Nombre.trim()) {
    errors.Nombre = 'El campo Nombre es obligatorio';
  }

  if (!userData.Dificultad.trim() || isNaN(userData.Dificultad) || userData.Dificultad < 1 || userData.Dificultad > 5) {
    errors.Dificultad = 'La dificultad debe ser un número entre 1 y 5';
  }

  if (!userData.Duracion.trim() || isNaN(userData.Duracion) || userData.Duracion <= 0) {
    errors.Duracion = 'La duración debe ser un número mayor a 0';
  }

  if (userData.Paises.length === 0) {
    errors.Paises = 'Debes seleccionar al menos un país';
  }  

  return errors;
};

export default validate;

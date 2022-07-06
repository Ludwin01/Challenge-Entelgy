export const getUser = async () => {
  // Declaro mi url base
  const url = "https://reqres.in/api/users?page=";
  // Declaro mi variable para guardar mis datos completos
  let all_users = [];
  // try catch para atrapara cualquier error y mostrarlo
  try {
    // Traigo los datos de localStorage
    const exist = window.localStorage.getItem("allUsers");

    // Verifico si existe datos
    if (!!exist) {
      // Si existe retorno la data parseada
      return JSON.parse(exist);
    } else {
      // si no existe hago la petición a las url
      const first_users = await fetch(`${url}1`);
      const second_users = await fetch(`${url}2`);

      //  Si el servidor retorna una respuesta correcta ejecuto el siguiente código
      if (first_users.ok == true && second_users.ok == true) {
        const first = await first_users.json();
        const second = await second_users.json();
        // Parseo la data para usar el spreed operator y mezclar los datos
        all_users = [...first.data, ...second.data];
        // Seteo la data al localStorage
        window.localStorage.setItem("allUsers", JSON.stringify(all_users));
      }
      // Retorno todos los usuarios
      return all_users;
    }
  } catch (error) {
    // muestro el error
    console.log({ error });
  }
};

// Función para traerme un usuario expecífico con el id
export const getUserById =  (id=1) => {
  // Me traigo todos los usuarios almacenados en LS
  const users = JSON.parse(window.localStorage.getItem("allUsers") || "");
  //  si no hay usuarios retorno un null
  if (!users) return null;
  // En user se almacena el primer objeto que coincida con el id ingresado
  const user = users.find((user) => user.id == id);
  // retorno el usuario
  return user;
}
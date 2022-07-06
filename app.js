import "./components/cardUser.js";
import "./components/modalUser.js";
import { getUser } from "./services/users.js";

const renderCards = async () => {
  // Defino el contenedor para llenarlo con el web-component card-user
  const container = document.getElementById("contain-users");
  // Obtengo todo los usuarios
  const users = await getUser();
  // Declaro la variable que se encargará de concatenar todos los componentes
  let renderUser = "";

  // Realizoel bucle para para conatenar los componentes cada uno con su parametro definido
  for (const user of users) {
    renderUser =
      renderUser +
      `<card-user
    avatar="${user.avatar}"
    first_name="${user.first_name}"
    last_name="${user.last_name}"
    email="${user.email}"
    id="${user.id}"
    ></card-user>`;
  }
  // Agrego el contenido del renderUser como un html en el contenedor "container"
  container.innerHTML = renderUser;
};

renderCards();

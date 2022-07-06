import "./components/cardUser.js";
import "./components/modalUser.js";
import { getUser } from "./services/users.js";

const renderCards = async () => {
  const container = document.getElementById("contain-users");
  const users = await getUser();
  let renderUser = "";

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

  container.innerHTML = renderUser;
};

renderCards();

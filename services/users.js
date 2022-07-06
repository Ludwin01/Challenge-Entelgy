export const getUser = async () => {
  const url = "https://reqres.in/api/users?page=";
  let all_users = [];
  try {
    const exist = window.localStorage.getItem("allUsers");

    if (!!exist) {
      return JSON.parse(exist);
    } else {
      const first_users = await fetch(`${url}1`);
      const second_users = await fetch(`${url}2`);

      if (first_users.ok == true && second_users.ok == true) {
        const first = await first_users.json();
        const second = await second_users.json();
        all_users = [...first.data, ...second.data];
        window.localStorage.setItem("allUsers", JSON.stringify(all_users));
      }
      return all_users;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const getUserById =  (id=1) => {
  const users = JSON.parse(window.localStorage.getItem("allUsers") || "")
  if (!users) return null
  const user = users.find(user=>user.id==id)
  return user 
}
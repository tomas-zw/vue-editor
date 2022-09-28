const usersModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337/auth"
    : "https://jsramverk-editor-toza21.azurewebsites.net/auth",
  getUsers: async function getUsers() {
    const response = await fetch(`${usersModel.baseUrl}`);
    const users = await response.json();

    return users.data;
  },
  addUser: async function addUser(newUser) {
    const response = await fetch(`${usersModel.baseUrl}`, {
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();

    return result.data;
  },
};

export default usersModel;

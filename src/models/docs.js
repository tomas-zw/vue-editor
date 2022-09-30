const docsModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337/"
    : "https://jsramverk-editor-toza21.azurewebsites.net/",

  getDocs: async function getDocs(token) {
    const params = `?find=${token.email}`;
    const response = await fetch(`${docsModel.baseUrl}${params}`, {
      headers: {
        "x-access-token": token.token,
      },
    });
    const docs = await response.json();
    //console.log(`docs: ${docs.data}`);

    //return docs.data;
    return docs.data || {};
  },

  getUsers: async function getUsers(token) {
    const response = await fetch(`${docsModel.baseUrl}users`, {
      headers: {
        "x-access-token": token,
      },
    });
    const users = await response.json();
    //console.log(`docs: ${users.data}`);

    return users.data || {};
  },
  addDoc: async function addDoc(newDoc, token) {
    const response = await fetch(`${docsModel.baseUrl}`, {
      body: JSON.stringify(newDoc),
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      method: "POST",
    });
    //console.log(response);
    const result = await response.json();

    return result.data;
  },
  updateDoc: async function updateDoc(newDoc, token) {
    const response = await fetch(`${docsModel.baseUrl}`, {
      body: JSON.stringify(newDoc),
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      method: "PUT",
    });
    //const result = await response.json();
    //console.log(response);

    //return result.data;
    return "";
  },
};

export default docsModel;

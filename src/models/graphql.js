const graphqlModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337/graphql"
    : "https://jsramverk-editor-toza21.azurewebsites.net/graphql",

  getDocs: async function getDocs(token) {
    const response = await fetch(`${graphqlModel.baseUrl}`, {
      method: "POST",
      headers: {
        "x-access-token": token.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{ docs(email: "${token.email}") {_id owner title body users}}`,
      }),
    });
    const docs = await response.json();
    const data = {
      data: {
        msg: "graphql",
        collection: docs.data.docs,
      },
    };

    return data.data || {};
  },
  getUsers: async function getUsers(token) {
    const response = await fetch(`${graphqlModel.baseUrl}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: `{ userNames { email }}` }),
    });
    const users = await response.json();
    const data = {
      data: {
        msg: "graphql",
        users: users.data.userNames,
      },
    };

    return data.data || {};
  },
};

export default graphqlModel;

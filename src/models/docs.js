const docsModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-toza21.azurewebsites.net/",

  getDocs: async function getDocs(token) {
    const response = await fetch(`${docsModel.baseUrl}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const docs = await response.json();
    console.log(`docs: ${docs.data}`);

    //return docs.data;
    return docs.data || {};
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
    console.log(response);
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
    console.log(response);

    //return result.data;
    return "";
  },
};

export default docsModel;

//baseUrl: window.location.href.includes("localhost") ?
//       "http://localhost:1337" :
//      "https://jsramverk-wines-efostud.azurewebsites.net",

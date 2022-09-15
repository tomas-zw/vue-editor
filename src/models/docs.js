const docsModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-toza21.azurewebsites.net/",

  getDocs: async function getDocs() {
    const response = await fetch(`${docsModel.baseUrl}`);
    const docs = await response.json();

    return docs.data;
  },
  addDoc: async function addDoc(newDoc) {
    const response = await fetch(`${docsModel.baseUrl}`, {
      body: JSON.stringify(newDoc),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    console.log(response);
    const result = await response.json();

    return result.data;
  },
  updateDoc: async function updateDoc(newDoc) {
    const response = await fetch(`${docsModel.baseUrl}`, {
      body: JSON.stringify(newDoc),
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
    });
    //const result = await response.json();

    //return result.data;
    return "";
  },
};

export default docsModel;

//baseUrl: window.location.href.includes("localhost") ?
//       "http://localhost:1337" :
//      "https://jsramverk-wines-efostud.azurewebsites.net",

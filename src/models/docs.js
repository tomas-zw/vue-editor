const docsModel = {
  baseUrl: "http://localhost:1337/",
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

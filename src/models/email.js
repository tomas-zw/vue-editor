const emailModel = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337/"
    : "https://jsramverk-editor-toza21.azurewebsites.net/",

  sendEmail: async function sendEmail(to, token) {
    const body = {
      to: to,
      from: token.email,
    };
    const response = await fetch(`${emailModel.baseUrl}email`, {
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        "x-access-token": token.token,
      },
      method: "POST",
    });
    const result = await response.json();

    return result.data;
  },
};

export default emailModel;

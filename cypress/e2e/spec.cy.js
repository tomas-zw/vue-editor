describe("My first tests", () => {
  before(() => {
    cy.visit("http://www.student.bth.se/~toza21/editor/");
  });

  it("Menu, titlebar and editor exists", () => {
    cy.get(".green").contains("Login/Register");
    cy.get(".title-bar").should("have.value", "");
    cy.get(".ProseMirror").should(
      "contain",
      "Registrera och/eller Logga in för att spara och hämta dokument."
    );
  });

  it("Edit title and body in a new document", () => {
    cy.contains("Login/Register").click();
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Login");
    cy.contains("X");
    cy.contains("Register");
    /*
    cy.get(".title-bar")
      .type("This is a new Title")
      .should("have.value", "This is a new Title");
    cy.get(".ProseMirror")
      .should("contain", "")
      .type("This is a new Body")
      .find("p")
      .should("contain", "This is a new Body");
    */
  });
  /* kmom05 
  it('Open "MongoDB Atlas" dokument', () => {
    cy.contains("Välj dokument").focus();
    cy.get(".dropdown-content")
      .contains("MongoDB Atlas")
      .click({ force: true });
    cy.get(".title-bar").should("have.value", "MongoDB Atlas");
  });
*/
});

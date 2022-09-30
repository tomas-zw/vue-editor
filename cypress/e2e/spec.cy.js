describe("My first tests", () => {
  before(() => {
    cy.visit("http://www.student.bth.se/~toza21/editor/");
  });

  it("Menu, titlebar and editor exists", () => {
    cy.get(".menu").contains("Spara");
    cy.get(".menu").contains("nytt dokument");
    cy.get(".menu").contains("Välj dokument");
    cy.get(".title-bar").should("have.value", "");
    cy.get(".ProseMirror").should(
      "contain",
      "Skapa ett nytt dokument eller välj ett befintligt från menyn."
    );
  });

  it("Edit title and body in a new document", () => {
    cy.contains("nytt dokument").click();
    cy.get(".title-bar")
      .type("This is a new Title")
      .should("have.value", "This is a new Title");
    cy.get(".ProseMirror")
      .should("contain", "")
      .type("This is a new Body")
      .find("p")
      .should("contain", "This is a new Body");
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

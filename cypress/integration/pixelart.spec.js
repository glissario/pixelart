describe('PixelArt', () => {
  beforeEach('visit', () => {
    cy.visit('/');
  });

  it('init field with input', () => {
    cy.get('[data-test=input-size]')
      .should('exist')
      .type('10')
      .type(' {enter}');

    cy.get('[data-test=palette]').should('exist');
    cy.get('[data-test=palette-square]')
      .should('exist')
      .should('have.length', '12');

    cy.get('[data-test=art-field]').should('exist');
    cy.get('[data-test=field-square]')
      .should('exist')
      .should('have.length', '100');
  });
  it('init field with button', () => {
    cy.get('[data-test=dim-btn1]').should('exist').click();
    cy.get('[data-test=palette-square]')
      .should('exist')
      .should('have.length', '12');
    cy.get('[data-test=field-square]')
      .should('exist')
      .should('have.length', '64');
  });

  it('change color', () => {
    cy.get('[data-test=dim-btn1]').should('exist').click();
    cy.get('[data-test=palette-square]').click({ multiple: true });
    cy.get('[data-test=palette-square]').first().click();
    cy.get('[data-bg-color]').then(($color) => {
      cy.get('[data-test=field-square]')
        .first()
        .click()
        .should('have.css', 'background-color');
    });
  });
});

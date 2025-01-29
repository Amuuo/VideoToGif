describe('Video to GIF Converter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main title', () => {
    cy.contains('Video to GIF Converter').should('be.visible');
  });

  it('should have a file upload area', () => {
    cy.contains('Drag and drop a video file here').should('be.visible');
  });

  it('should toggle dark mode', () => {
    cy.get('button[aria-label="toggle dark mode"]').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
  });

  it('should show conversion options', () => {
    cy.contains('Start Time').should('be.visible');
    cy.contains('Duration').should('be.visible');
    cy.contains('Width').should('be.visible');
    cy.contains('FPS').should('be.visible');
    cy.contains('Quality').should('be.visible');
  });
}); 
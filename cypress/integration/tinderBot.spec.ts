describe('Tinder', function () {

    beforeEach(function () {
        cy.visit('https://tinder.com/app/recs')
    })

    it('Login', function () {
        cy.log('Tinder Login')
        cy.get('button > span[class="Pos(r) Z(1)"]').should('have.text', 'Connexion').first().click()
        cy.wait(500)
        cy.get('button[aria-label="Connexion avec Facebook"]').should('have.text', 'Connexion avec Facebook').first().click()
        cy.wait(500)
        cy.log('Facebook Login')
        cy.get('input[name=email').type('benoit.grasset@gmail.com')
        cy.get('input[name=pass').type('toto')
        cy.wait(400)
        cy.get('input[name=login').first().click()
    })

})

describe('Tinder', function () {

    beforeEach(function () {
        cy.visit('https://tinder.com/app/recs')
    })

    it('Login', function () {
        cy.log('Tinder login')
        cy.get('button > span[class="Pos(r) Z(1)"]').should('have.text', 'Connexion').first().click()
        cy.wait(500)
        cy.get('button[aria-label="Connexion avec Facebook"]').should('have.text', 'Connexion avec Facebook').first().click()
        cy.wait(700)

        cy.log('Facebook login')

        const username = Cypress.env('facebookLoginUsername')
        const password = Cypress.env('facebookLoginPassword')
        const socialLoginOptions = {
            username: username,
            password: password,
            headless: true,
            logs: false,
            postLoginSelector: '.account-panel'
        }

        return cy.task('FacebookSocialLogin', socialLoginOptions).then(({ cookies }) => {
            cy.clearCookies()

            const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
            if (cookie) {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    expiry: cookie.expires,
                    httpOnly: cookie.httpOnly,
                    path: cookie.path,
                    secure: cookie.secure
                })

                Cypress.Cookies.defaults({
                    preserve: cookieName
                })
            }
        })

        cy.get('input[name=email').type('benoit.grasset@gmail.com')
        cy.get('input[name=pass').type('toto')
        cy.wait(400)
        cy.get('input[name=login').first().click()

        cy.get('button > span[class="Pos(r) Z(1)"]').should('have.text', 'Non merci').first().click()

    })

})
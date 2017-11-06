describe('Logeando', function() {
	before(function() {
		Cypress.config('baseUrl','http://localhost:3000/#!/')
	})

	context('NoAutorizado', function(){
		it('Se ingresa a campañas sin estar autorizado, redirecciona a login',function(){
			cy.visit('/dashboard/campanas')
			cy.url().should('include','/login');
		})
	})

	context('Autorizado', function(){
		beforeEach(function(){
			cy.visit('/login')
		})

		it('Redirecciona a /dashboard/campanas al loguear', function(){
			cy.get('input[name=name]').type('fakeusername')
			cy.get('input[name=pass]').type('fakepassword')
			cy.get('#login').click({force:true})
			cy.url().should('include', '/login')
			
		})	

		it('Redirecciona a /dashboard/campanas al loguear', function(){
			cy.get('input[name=name]').type('nahuapas')
			cy.get('input[name=pass]').type('12345678')
			cy.get('#login').click({force:true})

			cy.url().should('include', '/dashboard/campanas')

			cy.get('#grupos').click()
			cy.wait(200)
			cy.get('#grupo0')
			cy.get('#grupo1')
		})

		it('Voy a profile despues de loguearme', function(){
			cy.get('input[name=name]').type('nahuapas')
			cy.get('input[name=pass]').type('12345678')
			cy.get('#login').click({force:true})

			cy.url().should('include', '/dashboard/campanas')

			cy.
		})
	})
})
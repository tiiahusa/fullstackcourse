const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')


describe('Note app', () => {
    //Eristeään sivulle siirtyminen omaan lohkoon
    beforeEach(async ({ page, request }) => {
        //Resetoidaan tietokanta
        await request.post('/api/testing/reset')
        //Luodaan testikäyttäjä
        await request.post('/api/users', {
          data: {
            name: 'Tiia Husa',
            username: 'tiuhti',
            password: 'salainen'
          }
        })
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes') //Etitään teksti Notes
        await expect(locator).toBeVisible() //Tarkistetaan, että notes löytyuy
        //Kuten myös tää alempi teksit
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
      })
  
    test('login form can be opened', async ({ page }) => {
        await loginWith(page, 'tiuhti', 'salainen')
        //Alempi eristetty omaksi moduuliksi, helper.js
      /*await page.getByRole('button', { name: 'log in' }).click() //Painetaan log in buttonia
      //Koska on nimetty LoginFormissa tekstikentät, voidaan viitata niihin nimellä
      await page.getByTestId('username').fill('tiuhti')
      await page.getByTestId('password').fill('salainen')
      
      /*await page.getByRole('textbox').first().fill('tiuhti2') //Täytetään kentät
      await page.getByRole('textbox').last().fill('testingTesticle') //First ja last auttaa löytämään oikeat
      
      Voidaan myös ettiä kaikki bpoksit taulukkoon
      const textboxes = await page.getByRole('textbox').all()
      Ja viitata niihin näin:
      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('salainen')
      
      await page.getByRole('button', { name: 'login' }).click() //Kirjaudutaan sisälle*/
      //Tarkistetaan vielä että kirjautumisteksti löytyy
      await expect(page.getByText('Tiia Husa logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'tiuhti', 'wrong')
    
        const errorDiv = await page.locator('.error') // koska elementti on nimetty erroriksi: <div className="error"> voidaan se poimia näin
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText('Tiia Husa logged in')).not.toBeVisible()
      })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'tiuhti', 'salainen')
        })

        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
              await createNote(page, 'first note xxx')
              await createNote(page, 'second note xxx')
            })
        
            test('one of those can be made nonimportant', async ({ page }) => {
                const otherNoteText = await page.getByText('first note')
                const otherdNoteElement = await otherNoteText.locator('..')
              await otherNoteElement
                .getByRole('button', { name: 'make not important' }).click()
              await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })
          }) 
    
        test('a new note can be created', async ({ page }) => {
          await createNote(page, 'a note created by playwright')
           /* //Painetaan new note buttonia, siirretty omaan moduuliin helper.js
          await page.getByRole('button', { name: 'new note' }).click()
          //Täytetään tekstiboksi
          await page.getByRole('textbox').fill()
          //Painetaan tallenna
          await page.getByRole('button', { name: 'save' }).click()*/
          //Tsekataan, että muistiinpano löytyy
          await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
/*
        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'an another note created by playwright')
            })
        
            test('importance can be changed', async ({ page }) => {
              await page.getByRole('button', { name: 'make not important' }).click()
              await expect(page.getByText('make important')).toBeVisible()
            })
          })*/
      })

  })
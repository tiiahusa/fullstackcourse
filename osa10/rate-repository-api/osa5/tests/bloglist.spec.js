const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Bloglist', () => {
  //Eristeään sivulle siirtyminen omaan lohkoon
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Tiia Husa logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'the first blog title',
        'blog author',
        'http://blogurl.com',
      )
      await expect(page.getByText('the first blog title')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'the first blog title',
          'blog author',
          'http://blogurl.com',
        )
        await createBlog(
          page,
          'the second blog title',
          'blogger',
          'http://blog2url.com',
        )
        await createBlog(
          page,
          'the third blog title',
          'writer',
          'http://writesblog.com',
        )
      })

      test('one of those can like', async ({ page }) => {
        const secondElement = await page
          .getByText('the second blog title')
          .locator('..')
        await secondElement.getByRole('button', { name: 'view' }).click()
        expect(page.getByText('Likes 0like').nth(1)).toBeVisible()
        await secondElement.getByRole('button', { name: 'like' }).click()
        expect(page.getByText('Likes 1like').first()).toBeVisible()
      })
    })
  })
})

describe('Blog can be removed', () => {
  test('a blog can be removed', async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tiia Husa',
        username: 'tiuku',
        password: 'salainen',
      },
    })
    await page.goto('http://localhost:5173')
    await loginWith(page, 'mluukkai', 'salainen')

    await createBlog(
      page,
      'the first blog title',
      'blog author',
      'http://blogurl.com',
    )
    await createBlog(
      page,
      'the second blog title',
      'blogger',
      'http://blog2url.com',
    )

    const element = await page.getByText('the first blog title').locator('..')
    await element.getByRole('button', { name: 'view' }).click()
    await element.getByRole('button', { name: 'remove' }).click()
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.getByRole('button', { name: 'remove' }).nth(1).click()
    expect(page.getByText('the first blog title')).not.toBeVisible()
  })
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
          })
      })*/

import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto("http://localhost:4200/")
    await page.getByRole('link', { name: 'Forms' }).click()
    await page.getByRole('link', { name: 'Form Layouts' }).click()
})


test("Locator syntax rules", async({page}) =>{
    //by Tag name
    page.locator("input")

    //by ID
    await page.locator("#inputEmail1").click()

    //by Class value
    page.locator(".shape-rectangle")

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Class value full
    page.locator('[class="input-full-wdth size-medium status-basic shape-rectangle nb-transition"]')

    //by combine
    page.locator('input[placeholder="Email"]')

})

test("Navigation", async({page}) => {
    // await page.getByRole("textbox", {name: "Email"}).first().click()
    // await page.getByRole("button", {name: "Sign in"}).first().click()

    // await page.getByLabel("Email").first().click()
    // await page.getByPlaceholder("Jane Done").click()

    // await page.getByTitle("IoT Dashboard").click()
    await page.getByTestId("SignIn").click()
})

test("location child elements", async({page}) => {
    // await page.locator('nb-card nb-radio :text-is("Option 2")').click()
    await page.locator('nb-card-body').getByRole('button', {name: "Sign in"}).first().click()
}) 

test('location parent elements', async({page}) => {
    //await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole("textbox", {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:'Email'}).click()

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole("textbox", {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole("textbox", {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('#inputFirstName')}).getByRole("textbox", {name: "First Name"}).click()
})

test('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailFild = basicForm.getByRole("textbox", {name: "Email"})

    await emailFild.fill('test@gmail.com')
    await basicForm.getByRole("textbox", {name: "Password"}).fill('1234')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailFild).toHaveValue('test@gmail.com')
})

test('extracting value', async({page}) =>{
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadio = await page.locator('nb-radio').allTextContents()
    expect(allRadio).toContain('Option 1')

    //input value
    const emailFild = basicForm.getByRole('textbox', {name: 'Email'})
    await emailFild.fill('test@gmail.com')
    const emailValue = await emailFild.inputValue()
    expect(emailValue).toEqual('test@gmail.com')
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

    //General assertions
    // const value = 5
    // expect(value).toEqual(5)

    // const text = await basicFormButton.textContent()
    // expect(text).toEqual('Submit')

    // Locftor essrsions - Найти елемент на странице
    // await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion -Найти елемент и кликнуть по нему
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})
import {test} from '@playwright/test'

// test.beforeEach(async({page}) =>{
//     await page.goto("http://localhost:4200/")
//     await page.getByText("Forms").click()await page.getByText("Forms").click()
// })

// test('The first test', async ({page}) => {
   
//     await page.getByText("Form Layouts").click()
// })

// test('Click to the Datepicker', async ({page}) => { 
//     await page.getByText("Datepicker").click()
// })

test.beforeEach(async({page}) => {
    await page.goto("/")
})

// test("the first test", async ({page}) => {
//     await page.getByText("Form Layouts").click()
// })

// test("navigator to datepicker page", async ({page}) => {
//     await page.getByText("Datepicker").click()
// })

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByRole('link', { name: 'Forms' }).click()
    })

    test('The first test', async ({page}) => {
        await page.getByRole('link', { name: 'Form Layouts' }).click()
    })

    test('Click to the Datepicker', async ({page}) => { 
        await page.getByRole('link', { name: 'Datepicker' }).click()
    })
})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
        await page.getByRole('link', { name: 'Forms' }).click()
    })

    test('The first test1', async ({page}) => {
        await page.getByRole('link', { name: 'Charts', exact: true }).click()
    })
    
    test('Click to the Datepicker1', async ({page}) => { 
        await page.getByRole('link', { name: 'Charts', exact: true }).click()
        await page.getByRole('link', { name: 'Echarts' }).click()
    })
})
import {test} from '@playwright/test'

test('Applitools Report', async({page}) => {
    await page.goto("/")

    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
     
})
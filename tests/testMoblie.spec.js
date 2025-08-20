import {expect, test} from '@playwright/test'

test('input fields', async({page}, testInfo) => {
        await page.goto("/")
        if(testInfo.project.name == 'mobile'){
          await page.locator('.sidebar-toggle').click()  
        }
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        if(testInfo.project.name == 'mobile'){
          await page.locator('.sidebar-toggle').click()  
        }

        const usingTheGridEmailInput =page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})

        //Ввод текста в поле  {deLay: 500} - медленное написание текста
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 100}) 
        
        //Удаление текста 
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('1111@test.com', {delay: 100})
    })
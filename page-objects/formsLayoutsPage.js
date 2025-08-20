import { page } from "@playwright/test"; 

export class FormsLayoutsPage {

     constructor(page){
        this.page = page;
     }

     async submitUsingTheGridFormCredentialsAndSelectOption(email, password, optionText) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).pressSequentially(email, {delay: 100})
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).pressSequentially(password, {delay: 100})
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
   /**
    * Методы вводимых данных
    * @param {*} name Имя
    * @param {*} email Валидные имейл
    * @param {*} rememberMe тут если true галочка стоит если false - нет
    */
    async submitInlineFormWithNameEmailAndCheakbox(name, email, rememberMe) {
        const usingTheInlineForm = this.page.locator('[class="inline-form-card"]')
        await usingTheInlineForm.getByPlaceholder('Jane Doe').pressSequentially(name, {delay: 100})
        await usingTheInlineForm.getByPlaceholder('Email').pressSequentially(email, {delay: 100})
        if(rememberMe)
            await usingTheInlineForm.getByRole('checkbox').check({force: true})
        await usingTheInlineForm.getByRole('button').click()
    }
}
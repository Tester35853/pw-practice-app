import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker, Faker } from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto("/")
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().fromLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTabPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrizec mathods', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().fromLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormCredentialsAndSelectOption('test@test.com', '1234', 'Option 1')

})

test('inline form', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName() //Генерируем фейковые имена и фамилии
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(10)}@gmail.com`// Генерируем фейковый имейл без пробела между ФИО
    
    await pm.navigateTo().fromLayoutsPage()
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheakbox(randomFullName, randomEmail, true)
    await page.screenshot({path: 'screenshot/formLayoutsPage.png'})//Создаем скриншот данного теста
    await page.locator('[class="inline-form-card"]').screenshot({path: 'screenshot/inLineForm.png'})//Делаем скриншот опреденой секции
})

test('date picker page', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(40)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 18)
})
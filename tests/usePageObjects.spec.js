import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormsLayoutsPage} from '../page-objects/formsLayoutsPage'
import {DatepickerPage} from '../page-objects/datePickerPage'
import {faker}  from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto("/")
})

test.only('navigate to form page @smoke', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.fromLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTabPage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametrizec mathods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutPage = new FormsLayoutsPage(page)

    await navigateTo.fromLayoutsPage()
    await onFormLayoutPage.submitUsingTheGridFormCredentialsAndSelectOption('test@test.com', '1234', 'Option 1')

})

test('inline form', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutPage = new FormsLayoutsPage(page)
    
    await navigateTo.fromLayoutsPage()
    await onFormLayoutPage.submitInlineFormWithNameEmailAndCheakbox('Qipy', 'test@test.com', true)
})

test('date picker page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(40)
    await onDatepickerPage.selectDatepickerWithRangeFromToday(-3, 6)
})
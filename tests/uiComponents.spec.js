import {expect, test} from '@playwright/test'
import { table } from 'console'

test.beforeEach(async({page}) => {
    await page.goto("/")
})

test.describe('From Layouts page', () => {
    test.describe.configure({retries: 0})//Запуск определенного количесва повторного теста 

    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
    test('input fields', async({page}) => {
        const usingTheGridEmailInput =page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})

        //Ввод текста в поле  {deLay: 500} - медленное написание текста
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 200}) 
        
        //Удаление текста 
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('1111@test.com', {delay: 200})

        //Подтверждение текста 
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('1111@test.com')

        //Локаторное подтверждение
        await expect(usingTheGridEmailInput).toHaveValue('1111@test.com')
    })

    test.only('Radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        
        //Поиск радио кнопки по лейблу
        await usingTheGridForm.getByLabel('Option 1').click({force: true})

        //поиск радио кнопки по роли
        // await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})

        //Проверка радио кнопки на нажатие
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        await expect(usingTheGridForm).toHaveScreenshot() // Устанавливаем скриншот для данного теста
        //expect(radioStatus).toBeTruthy()

        //Второй способ проверки кнопки
        // await expect(usingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked()

        //проверка что одна кнопка не включена а другая включена
        // await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        // expect (await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        // expect (await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    })
})

test('checkboxs', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //Нажимаем на чебокс который уже нажат
    //await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true})

    //Чекаем на чекбокс
    await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    const allBoxex = page.getByRole('checkbox')
    for(const box of await allBoxex.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('dropDown', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')  //когда лист имеет тег UL
    page.getByRole('listitem')  //Когда лист имеет тег LI

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    //Проверка каждого цвета из списка цветов через скрипт
    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }
    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != 'Corporate')
            await dropDownMenu.click()
    }
})

//Ищем подсказки на странице
test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')
})

//Диалоговые окна браузерного типа
test('Dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Выводи браузерное сообщение и делаем действие
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') // Проверяем что пользователь с таким имейлом отсутвует
})

test('Web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Находим нужную строку по имейлу и нажимаем на "изменить"
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()

    //Находим поле Age и чистим поле а затем вносим значение и подтверждаем
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //Ищем строку в таблице по ID где выдает два значения, нужно выбрать одно
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()

    //Вносим изменения в поле имейл
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').type('Test@test.com', {delay: 200}) // медленно вносим текст
    await page.locator('.nb-checkmark').click() //Сохраняем
    await expect(targetRowById.locator('td').nth(5)).toHaveText('Test@test.com') //Проверяем

    //Фильтр колонки в таблице

    const ages = ['20', '30', '200', '400'] //созадем данные в масиве

    //Функция перебора масива данных
    for ( let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').type(age, {delay: 200}) 
        await page.waitForTimeout(700) //время задержки экрана

        const ageRows = page.locator('tbody tr')

        //Выводим весь спиок полученных данных и проверяем
        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()

            if(age == '200' ){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else if(age == '400' ){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
                
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Datepicker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const celendarInputField = page.getByPlaceholder('Form Picker')
    await celendarInputField.click()

    //Находим локатор определенного месяца
    await page.locator('[class="bounding-month day-cell ng-star-inserted"]').getByText('31').click()
    await expect(celendarInputField).toHaveValue('Jul 31, 2025')
    await celendarInputField.click()
    await page.locator('nb-calendar-pageable-navigation .next-month').click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('2', {exact: true}).click()//{exact: true} точное совпадение
    await expect(celendarInputField).toHaveValue('Aug 2, 2025')
})

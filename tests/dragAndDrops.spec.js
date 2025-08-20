import {expect, test} from '@playwright/test'

test('drag and drops with iframe', async({page}) => {
    await page.goto('http://www.globalsqa.com/demo-site/draganddrop/')

    //Находим фрейм и перетаскивам фото в поле методом dragTo
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: 'High Tatras 3'}).dragTo(frame.locator('#trash'))

    //перетаскивание с использованием мыши
    await frame.locator('li', {hasText: 'High Tatras 4'}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    //Проверяем
    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 3', 'High Tatras 4'])
})
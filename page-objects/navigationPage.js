import { page } from "@playwright/test"; 
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
    
    constructor(page) {
        super(page);
        this.fromLayoutsMenuItems = page.getByText('Form Layouts');
        this.DatepickerMenuItem = page.getByText('Datepicker');
        this.SmartTableMenuItem = page.getByText('Smart Table');
        this.ToastrMenuItem = page.getByText('Toastr');
        this.TooltipMenuItem = page.getByText('Tooltip');
    }

    async fromLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.fromLayoutsMenuItems.click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(2000)
        await this.DatepickerMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    async smartTabPage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.SmartTableMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.ToastrMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.TooltipMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    //Создаем проверку закрытия формы двух полей
    async selectGroupMenuItem(groupItemTitle){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expendedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expendedState === 'false')
            await groupMenuItem.click()
    }
}

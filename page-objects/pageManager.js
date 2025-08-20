import { page, expect} from "@playwright/test";
import {NavigationPage} from '../page-objects/navigationPage'
import {FormsLayoutsPage} from '../page-objects/formsLayoutsPage'
import { DatepickerPage } from '../page-objects/datePickerPage'


export class PageManager{
    constructor(page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formsLayoutsPage = new FormsLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutPage(){
        return this.formsLayoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}
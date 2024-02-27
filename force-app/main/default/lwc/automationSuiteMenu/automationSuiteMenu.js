/**
 * Dynamic App Menu 
 * - Menu can handle sub-categories
 * 
 * Events:
 *      menuselection - A selection event of any non parent menu-tree
 * 
 * @author Chayse McMillan
 */
import { LightningElement, api, track } from 'lwc';

export default class AutomationSuiteMenu extends LightningElement {

    // Set the menu Items (from parent compnent)
    @api set menuTree(value) {
        if(value) {
            this._menuTree = JSON.parse(JSON.stringify(value)); // Deep Clone
        }
    }
    @track _menuTree = [];
    get menuTree() {
        return this._menuTree;
    }

    /**
     * Inits the menu styles once the menu tree has loaded
     */
    handleInitMenuStyles(event) {
        this.template.querySelector('c-automation-suite-menu-item').initRootStyles();
    }

    /**
     * Author click handler
     */
    handleAuthorClick(event) {
        window.open('https://chayse-mcmillan.com', '_blank')
    }
}
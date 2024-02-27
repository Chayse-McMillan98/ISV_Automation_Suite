import { LightningElement, api, track } from 'lwc';
export default class AutomationSuiteMenuItem extends LightningElement {

    @api
    set menuItems(val) {
        this._menuItems = JSON.parse(JSON.stringify(val)); // Deep Clone
    }
    @track _menuItems;
    get menuItems() {
        return this._menuItems;
    }

    /**
     * Menu Left padding Handlers
     * - Set for sub-tree elements
     */
    subTree = false;
    @api 
    set subTreeLPad(val) {
        this._subTreeLPad = parseInt(val) + 50;
        this.subTree = true;
    }
    _subTreeLPad = 50;
    get subTreeLPad() {
        return this._subTreeLPad;
    }

    /**
     * Active Subtree
     */
    /*
    @api setInactiveSubtree() {
        this._activeSubtree = false
    }
    */
    
    @api
    set activeSubtree(val) {
        if(val != null && val != undefined) {
            this._activeSubtree = Boolean(val); 
        }
    }
    _activeSubtree = false;
    get activeSubtree() {
        return this._activeSubtree;
    }

    /**
     * Dynamic Menu Styles
     */
    get dynamicMenuStyle() {
        let dynamicStyles = '';

        // R-Pad
        if(this.subTree) {
            dynamicStyles += 'padding-right: 50px !important; margin-right: -50px; ';
        } else {
            dynamicStyles += 'padding-right: 50px !important; ';
        }

        // L-Pad
        dynamicStyles += 'padding-left: '+this.subTreeLPad+'px; ';
        if(this.subTree) {
            let mLeft = this.subTreeLPad-50;
            dynamicStyles += 'margin-left: -'+mLeft+'px; '
        }
        return dynamicStyles;
    }

    /**
     * Dynamic Menu Classlist
     */
    get dynamicMenuClasslist() {
        let classList = '';
        if(this.activeSubtree) {
            classList += 'activeSubtree'
        }
        return classList;
    }

    /**
     * Menu Item Or Menu Sub-Menu Click Handler
     */
    handleMenuItemClick(event) {
        let targetApiName = event.currentTarget.getAttribute("data-item");
        for(let index in this.menuItems) {
            let menuItem = this.menuItems[index];
            let currentTarget = this.template.querySelector(`[data-item="${menuItem.apiName}"]`);
            if(menuItem.apiName == targetApiName) {

                // Menu Tree Selection
                if(menuItem.subItems && menuItem.subItems.length > 0) {
                    let subMenuExpanded = menuItem.subItemsExpanded == true ? true : false;
                    menuItem.subItemsExpanded = !subMenuExpanded; // Negate!

                    if(menuItem.subItemsExpanded) {
                        this.dispatchEvent(
                            new CustomEvent('submenuexpanded', { bubbles:true, composed:true })
                        );
                    }

                // Menu Item Selection
                } else {
                    this.dispatchEvent(
                        new CustomEvent('menuselection', { 
                            bubbles: true, 
                            composed: true,
                            detail: {
                                value: menuItem.apiName
                            }
                        })
                    );
                }
                currentTarget.classList.add('menuTextActive');
                currentTarget.classList.remove('menuText');


            // Active Target State
            } else {
                currentTarget.classList.add('menuText');
                currentTarget.classList.remove('menuTextActive');
            }
        }
    }

    /**
     * Updates the Active CSS for the current recursion node
     */
    handleCSSActiveToggle(event) {
        for(let index in this.menuItems) {
            let menuItem = this.menuItems[index];
            let currentTarget = this.template.querySelector(`[data-item="${menuItem.apiName}"]`);

            // Set the state to inactive
            currentTarget.classList.add('menuText');
            currentTarget.classList.remove('menuTextActive');
        }
        this.activeSubtree = false;

        // Inform sub elements they're no-longer part of the active tree (if they're subtrees)
        /*
        for(let subElement in this.template.querySelectorAll('c-automation-suite-menu-item')) {
            subElement.setInactiveSubtree();
        }
        */
    }

    /**
     * CSS Attribute Handler for Inactive Menu Option OnHover Enter
     */
    _hoverTarget;
    handleMenuItemMouseOver(event) {
        let targetApiName = event.currentTarget.getAttribute("data-item");
        for(let index in this.menuItems) {
            let menuItem = this.menuItems[index];
            let currentTarget = this.template.querySelector(`[data-item="${menuItem.apiName}"]`);
            if(menuItem.apiName == targetApiName) {

                // Append the hover css styles
                this._hoverTarget = currentTarget;
                currentTarget.classList.add('menuTextHover');
            }
        }
    }

    /**
     * CSS Attribute Handler for Inactive Menu Option Onhover Leave
     */
    handleMenuItemMouseOut(event) {
        this._hoverTarget.classList.remove('menuTextHover');
    }
}
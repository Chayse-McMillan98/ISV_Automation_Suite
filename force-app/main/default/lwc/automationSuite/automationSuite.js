import { LightningElement } from 'lwc';

export default class AutomationSuite extends LightningElement {

    // TODO: Wire Menu Options Dynamically From Metadata Records
    MENU_TREE = [
        {
            name: 'User Interface',
            apiName: 'user_interface',
            subItems: [
                {
                    name: 'Sub Item 1',
                    apiName: 'sub_item_1'
                },
                {
                    name: 'Sub Menu 1',
                    apiName: 'sub_menu_1',
                    subItems: [
                        {
                            name: 'DEMO ITEM',
                            apiName: 'demo_item',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Other Outer Menu Item',
            apiName: 'other_outer_menu_item',
            subItems: [
                {
                    name: 'Sub Item 1',
                    apiName: 'sub_item_1'
                },
                {
                    name: 'Sub Menu 1',
                    apiName: 'sub_menu_1',
                    subItems: [
                        {
                            name: 'DEMO ITEM',
                            apiName: 'demo_item',
                        }
                    ]
                }
            ]
        }
    ];



    
    get menuTree() {
        return this.MENU_TREE;
    }    



    /**
     * Menu Navigation Handler (Set the rendered component -- current content area)
     */
    currentMenuSelection = '';
    handleMenuItemSelected(event) {
        this.currentMenuSelection = event.detail.value;
    }


}
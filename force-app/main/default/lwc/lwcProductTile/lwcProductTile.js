import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class LwcProductTile extends NavigationMixin(LightningElement) {
    @api product;

    @wire(CurrentPageReference) pageRef;

    navigateToDetail(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: this.product.Product2.Id,
                objectApiName: "Product2"
            }
        });
    }

    addToCart(){
        let productObj = {
            productId : this.product.Product2.Id,
            quantity: 1,
            price : this.product.UnitPrice,
            productName : this.product.Product2.Name,
            pricebookentryid : this.product.Id,
            pricebookid : this.product.Pricebook2Id
        };
        fireEvent(this.pageRef, 'addToCart', productObj);
        
    }
}
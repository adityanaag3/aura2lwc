import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import createOrder from '@salesforce/apex/MyCartCtrl.createOrder';

import ACCOUNT_ID from '@salesforce/schema/Order.AccountId';
import START_DATE from '@salesforce/schema/Order.EffectiveDate';
import ORDER_STATUS from '@salesforce/schema/Order.Status';
import PRICEBOOK_ID from '@salesforce/schema/Order.Pricebook2Id';

import emptyCartLogo from '@salesforce/resourceUrl/emptyCart';

export default class LwcCart extends LightningElement {
    //static resource
    emptyCartUrl = emptyCartLogo;

    //cart items
    @track cartItems = [];

    //order fields
    accountIdField = ACCOUNT_ID;
    startDateField = START_DATE;
    orderStatusField = ORDER_STATUS;
    priceBookField = PRICEBOOK_ID;
    defaultPricebookId;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('addToCart', this.addToCartHandler, this);
    }

    addToCartHandler(data){
        this.defaultPricebookId = data.pricebookid;
        this.cartItems.push(data);
    }

    removeFromCart(event){
        var recordIndex = event.target.dataset.indexvar;
        this.cartItems.splice(recordIndex, 1);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    get isCartEmpty(){
        return this.cartItems.length === 0;
    }

    handleSuccess(event){
        
        createOrder({orderId: event.detail.id, cartItems:JSON.stringify(this.cartItems)})
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!',
                    message: "Order #"+result+" has been created successfully",
                    variant: 'success'
                }));
                this.cartItems = [];
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
        
    }

    


}
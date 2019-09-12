import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductCatalogCtrl.getProducts';

const DELAY = 300;

export default class LwcProductCatalog extends LightningElement {
   
    searchKey = '';


    @wire(getProducts, {whereClause: '$searchKey'})
    products;

    handleChange(event){
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }
}
({
    doInit : function(component, event, helper) {
        helper.getProducts(component,'');
    },
    onClickAddToCart : function(component,event,helper){
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.id;
        var productName = selectedItem.dataset.name;
        var productPrice = selectedItem.dataset.price;
        var pricebookentryid = selectedItem.dataset.pricebookentryid;
        var pricebookid = selectedItem.dataset.pricebookid;
        var product = {
            productId : recId,
            quantity: 1,
            price : productPrice,
            productName : productName,
            pricebookentryid : pricebookentryid,
            pricebookid : pricebookid
        };
        $A.get("e.c:AddToCartEvent").
        setParams({
            product: JSON.stringify(product)
        }).fire();
    },
    handleKeyUp: function (component, event,helper) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = component.find('enter-search').get('v.value');
            helper.getProducts(component,queryTerm);
        }
    }
})
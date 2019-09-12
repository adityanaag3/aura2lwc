({
    addedToCart : function(component, event, helper) {
        var cartItems = component.get('v.cartItems');
        var productAdded = event.getParam("product");
        productAdded = JSON.parse(productAdded);
        cartItems.push(productAdded);
        component.set('v.cartItems',cartItems);
    },
    handleOnload : function(component, event, helper) {
        var pricebook2Id = component.get('v.cartItems')[0].pricebookid;
        component.find("statusInputField").set("v.value", 'Draft');
        component.find("pricebook2IdInputField").set("v.value",pricebook2Id);
    },
    onClickDelete : function(component,event,helper){
        var cartItems = component.get('v.cartItems');
        var recordIndex = event.target.dataset.index;
        cartItems.splice(recordIndex, 1);
        component.set('v.cartItems',cartItems);
    },
    onSuccessOrderCreation : function(component,event,helper){
        var record = event.getParam("response");
        var action = component.get("c.createOrder");
        action.setParams({ 
            orderId : record.id,
            cartItems : JSON.stringify(component.get('v.cartItems')) 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result != ''){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Order #"+result+" has been created successfully",
                        "type" : "success"
                    });
                    toastEvent.fire();
                    component.set('v.cartItems',[]);
                }else{
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": "Due to some internal issue, we can\'t process your order.",
                        "type" : "error"
                    });
                    toastEvent.fire();
                }
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        $A.enqueueAction(action);
    }
})
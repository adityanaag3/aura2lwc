public class MyCartCtrl {
    
    @AuraEnabled
    public static String createOrder(String orderId,String cartItems){
        try{
            List<ProductWrapper> productWrappers = (List<ProductWrapper>)JSON.deserialize(cartItems,List<ProductWrapper>.class);
            List<OrderItem> orderItemsToInsert = new List<OrderItem>();
            for(ProductWrapper productWrapper : productWrappers){
                OrderItem lOrderItem = new OrderItem();
                lOrderItem.UnitPrice = productWrapper.price;
                lOrderItem.Quantity = productWrapper.quantity;
                lOrderItem.OrderId = orderId;
                lOrderItem.PricebookEntryId = productWrapper.pricebookentryid;
                orderItemsToInsert.add(lOrderItem);
            }
            insert orderItemsToInsert;
            return [SELECT Id,OrderNumber FROM Order WHERE Id = :orderId].OrderNumber;
        }catch(Exception e){
            return e.getCause()+' '+e.getLineNumber()+' '+e.getMessage();
        }
        
    }
    
    public class ProductWrapper{
        public String pricebookentryid;
        public String Id;
        public String productName;
        public Decimal quantity;
        public Decimal price;
        public String pricebookid;
    }
}
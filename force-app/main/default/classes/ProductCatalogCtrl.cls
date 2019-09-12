public class ProductCatalogCtrl {
    
    @AuraEnabled(cacheable=true)
    public static List<PricebookEntry> getProducts(String whereClause){
        if(whereClause == null && whereClause == ''){
            return [SELECT Id,Product2.Id,Product2.Name,PriceBook2Id,UnitPrice 
                    FROM PricebookEntry WHERE PriceBook2.IsStandard = true ORDER BY Product2.Name];
        }else{
            return [SELECT Id,Product2.Id,Product2.Name,PriceBook2Id,UnitPrice 
                    FROM PricebookEntry WHERE PriceBook2.IsStandard = true AND Product2.Name LIKE :'%'+whereClause+'%'
                    ORDER BY Product2.Name];
        }
    }
    
}
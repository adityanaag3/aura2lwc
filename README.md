# CodeLive with Salesforce: Converting Aura to LWC

As a part of the #CodeLive webinar, a sample app called Product Catalog was converted from Aura to LWC. Find the recording and presentation here: https://developer.salesforce.com/event/convert-aura-to-lwc 

## About the App

Product Catalog is used by users to place orders. A screen will allow them to find products, add/remove them from cart. Once the cart is finalized, a user can select the Account, Order Date and Status, and click "Checkout" to create an order.

## Deployment Instructions

- Run `git clone https://github.com/adityanaag3/aura2lwc.git` in the Terminal or Command Prompt
- Open the folder aura2lwc in VS Code.
- To deploy to a Scratch org,  choose **Create Default Scratch Org** from the Command Palette, follow the prompts, and once the scratch org is created, run the command `sfdx force:source:push`, and once the code is pushed, run `sfdx force:org:open` to open the org.
- To deploy to a Dev Org, choose **Authorize an org** from the command palette, follow the prompts to finish authorizing. Then, choose **Set a default org** from the command palatte, and choose the org you just authorized. Then, run `sfdx force:org:open` to open the org.

## Using the App

- Navigate to the **Product Catalog** App.
- The **Product Catalog Aura** tab has the Aura Components.
- The **Product Catalog** tab has Lightning Web Components.

## Questions?

Reach out to me on my twitter handle @adityanaag
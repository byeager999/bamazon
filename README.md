# bamazon

Bamazon node.js/mysql app

Bamazon app allows the user to purchase "as seen on tv" items within the terminal using a node.js interface connected to a mysql database.

The main javascript logic in the app is contained in the bamazonCustomer.js file.  The bamazon.sql file contains the sql commands involved with setting up the bamazon database.

The app is designed to show a list of products available for purchase along with their price and available quantity.  Once the items are displayed it prompts the user what and how many of the items they would like to buy.  Should the user purchase an item and we have the amount they purchase in stock the app will thank them for their purchase an tell the user their total.  Should the user select an amount that is greater than the product's inventory it will prompt the user that we do not have that many in stock and suggest they choose another amount.  BamazonCustomer.js then updates the stock (if purchase was successful) and asks the user if they'd like to purchase another item.  Should the user want to purchase another item the above process starts all over with the updated stock of the previously purchased item.  Should the choose not to purchase another item it thanks them for shopping at Bamazon.

Below is the link to my github repository where this app resides: https://github.com/byeager999/bamazon

Link to the video demo of the app https://youtu.be/pkxrI3rd6nM

The technologies that were used in this app were: node.js mysql javascript npm inquirer

My role was that of the application developer for this application.

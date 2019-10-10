var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  queryAllItems();
});
console.log("Here are our available items.")

// query the database for all items up for sale
function queryAllItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
    }
    console.log("-----------------------------------");
    chooseItem();
    function chooseItem() {
      inquirer.prompt([
        {
          name: "choice",
          type: "input",
          message: "What item id would you like to purchase?",
          choices: function (value) {
            var choiceArray = [];
            return choiceArray;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }]).then(function (answer) {

          // This was used to see the choices the user was making
          // console.log('The user choice =', answer);
          // console.log('The user choice =', answer.choice);
          // console.log('The user choice =', answer.quantity);

          var chosenItem = answer.choice;
          var amountChosen = answer.quantity;
          // Checks if the amount of items available for purchase
          if (amountChosen >
            res[chosenItem].stock_quantity) {
            console.log("We do not have enough " + res[chosenItem - 1].product_name + "'s in stock.  Please choose another amount.")
          }
          // If enought items are available thanks the customer and gives them their total
          else {
            console.log("Thank you for your purchase.  You're total is $" + amountChosen * res[chosenItem - 1].price);
            updateQuantity();
            function updateQuantity() {
              console.log("Updating all " + res[chosenItem - 1].product_name + " quantities...\n");
              var newQuantity = res[4].stock_quantity - answer.quantity;
              var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  // need to update the subtract the amount ordered from the stock quantity with a math equation
                  { stock_quantity: newQuantity },
                  { item_id: chosenItem.item_id }
                ],
                function (err, res) {
                  if (err) throw err;
                })
            }
          }


          repeat();
        });

    }
  })
}
function repeat() {
  inquirer.prompt({
    // Ask user if he wants to purchase another item
    name: "repurchase",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase == "Yes") {
      queryAllItems();
    }
    else {
      console.log("Thanks for shopping at Bamazon!")
      connection.end();
    }
  });
}





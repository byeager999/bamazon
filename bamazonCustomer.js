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
  connection.query("SELECT * FROM items", function (err, res) {
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
        }]).then(function (userInput) {
            for (var i = 0; i < res.length; i++) {
              if (res[i].product_name === userInput.choice) {
                var chosenItem = res[i];
                console.log(chosenItem);
              }
            }
          var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(userInput.quantity);
          var sales = parseFloat(chosenItem.product_sales).toFixed(2);

          if (chosenItem.stock_quantity < parseInt(userInput.quantity)) {
            console.log("We do not have that many " + chosenItem + "s for available for sale.");
            repeat();
          } else {
            var total = (parseFloat(userInput.quantity) * chosenItem.price).toFixed(2);
            var totalPurchase = (parseFloat(total) + parseFloat(sales)).toFixed(2);

            var query = connection.query("UPDATE items SET ?, ? WHERE ?", [{ stock_quantity: updateStock }, { product_sales: totalPurchase }, { item_id: chosenItem.item_id }],
              function (err, res) {
                if (err) throw err;
                console.log("Thank you for your purchase!");
                console.log("Your total is $ " + total);
                repeat();
              })
          }
            
      })
    }


  });

}
function repeat() {
  inquirer.prompt({
    name: "repurchase",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase === "Yes") {
      queryAllItems();
    } else {
      console.log("Thank you for shopping with Bamazon!");
      connection.end();
    }
  })
}



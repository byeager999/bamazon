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
  });
}
// function to have the user to select which item they want to purchase
// function chooseItem() {
//   inquirer.prompt(
//     {
//       name: "choice",
//       type: "rawlist",
//       choices: function () {
//         var choiceArray = [];
//         for (var i = 0; i < results.length; i++) {
//           choiceArray.push(results[i].item_id);
//         } return choiceArray;
//       },
//       message: "What item id would you like to buy?"
//     }
//   )  
// }
// chooseItem();
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
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showCustomer();
});

var x;
function showCustomer() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            x = parseInt(res[i].stock_quantity);
        }
        questions = [
            {
                name: "item_id",
                type: "input",
                message: "Which is the id for the item you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]
        inquirer.prompt(questions).then(function (res1) {
            var select = (res1.item_id) - 1;
            var qty = parseInt(res1.quantity);
            var total = parseFloat((res[select].price + qty).toFixed(2));
            if (x < qty) {
                console.log(x);
                console.log("Sorry Insuficiente on stock!!");
                return reprompt();
            } else {
                              
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: ((res.stock_quantity) - qty)
                        },
                        {
                            id: res1.id
                        }
                    ], function (err, res2) {
                        console.log("Success! Your total is $" + total.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                        reprompt();
                    }
                );
               
            }            
        }
        )
    }
    )
}


function reprompt(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }]).then(function(ans){
      if(ans.reply){
        showCustomer();
      } else{
        console.log("See you soon!");
      }
    });
  }
  
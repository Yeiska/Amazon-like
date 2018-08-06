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

function showCustomer() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        select();
    });
}

questions = [
    {
        name: "id",
        type: "input",
        message: "Which is the id for the item you would like to buy?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }
]
function select() {
    inquirer.prompt(questions).then(function () {
        var query = "SELECT id FROM products where products.id = ?";
        connection.query( query, function (err, res) {
            console.log(res);
        })
    });
}
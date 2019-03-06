var mysql = require("mysql");
var inquirer = require ("inquirer");
var CFonts = require('cfonts');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  CFonts.say("superstore\nCustomer\naccess", {
    font: 'chrome',   
    colors: ['white'],   
});
  readProducts();
});

// Function to Read and list the product 
function readProducts(){
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
        console.log("Id: "+res[i].id);
        console.log("Product Name: "+res[i].product_name);
        console.log("Departement Name: "+ res[i].departement_name);
        console.log("Price: $"+ res[i].price)
        console.log("__________________________________"); 
        }
        buyProduct();
    });
}

// Function to select and buy product
function buyProduct(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please provide the ID of the product you like to purchase today:",
          name: "id"
        },
        {
          type: "input",
          message: "how many units of the product",
          name: "stock"
        },
        {type: "confirm",
        message: "Plese make sure the item ID and quantity are correct",
        name: "confirm",
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
          console.log("\nYou have chosen Item id " + inquirerResponse.id);
          console.log("You will get " + inquirerResponse.stock + " product(s) from ID "+inquirerResponse.id +"\n");
          idSelect = parseInt(inquirerResponse.id);
          quantitySelect = parseInt(inquirerResponse.stock);
          checkStock(idSelect, quantitySelect);
        }
        else {
          console.log("\nPlese make sure the item ID and quantity are correct\n");
        }
      });
}

// function to check the Quantity stock 
function checkStock(idSelect,quantitySelect){
    console.log("Checking stock for your product...\n");
    connection.query("SELECT * FROM bamazon.products WHERE ? ",
    [
      {
        id: idSelect
      }
    ],
    function(err, res) {
        currentStock = res[0].Stock_quantity;
       if(currentStock >quantitySelect){
        console.log("Enough product in the store ("+currentStock+")\n");
        var priceSales = res[0].price *  quantitySelect;
        var newQuantity = (currentStock - quantitySelect);
        updateStock(newQuantity, idSelect);
        updateSales(priceSales, idSelect);
       }
       else {
        console.log("not enough product on stock you can buy maximum "+currentStock);
       }
    })
};

// Function to update the Stock
function updateStock(newQuantity, idSelect) {
    console.log("Updating Stock...\n");
    var query = connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        Stock_quantity: newQuantity
      },
      {
        id: idSelect
      }
    ],
    function(err, res) {
        console.log("Stock updated!\n");
        console.log("The quantity stock is now "+ newQuantity);
    }
    );
}

// Function to update the product_sales
function updateSales(priceSales, idSelect) {
  var query = connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      product_sales: priceSales
    },
    {
      id: idSelect
    }
  ],
  function(err, res) {
 
  }
  );
}
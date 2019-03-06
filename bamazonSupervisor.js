var mysql = require("mysql");
var inquirer = require ("inquirer");
var Table = require('cli-table3');
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
    CFonts.say("superstore\nsupervisor\naccess", {
        font: 'chrome',   
        colors: ['white'],   
    });
  listMenu();
});

function listMenu() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "List a set of menu options",
        choices: [
          "View Product Sales by Department",
          "Create New Department",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Product Sales by Department":
          ViewDepartment();
          break;
  
        case "Create New Department":
          askDepartmentToAdd();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
}

// Function to Read and list the product 
function ViewDepartment(){
    connection.query(`SELECT departments.department_id,departments.department_name,departments.overhead_costs,SUM(products.product_sales) AS "sales_total" FROM departments LEFT JOIN products ON products.departement_name = departments.department_name GROUP BY department_id`, function(err, res) {
        if (err) throw err;
        table = new Table({
            head: ['department_id','department_name','overhead_costs','sales_total','total_profit']
        
          , colWidths: [15,15,15,15]
        });
        for (i=0;i<res.length;i++){
            table.push(
                [res[i].department_id,res[i].department_name,res[i].overhead_costs,res[i].sales_total,res[i].sales_total-res[i].overhead_costs]
            ); 
        }console.log(table.toString());
        listMenu();
    });
}

function askDepartmentToAdd(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name your Departement",
          name: "name"
        },
        {
          type: "input",
          message: "what is the over head costs?",
          name: "overheads"
        },
        {
          type: "confirm",
          message: "Plese make sure the item ID and quantity are correct",
          name: "confirm",
        }
      ])
      .then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
            console.log("Departement Name: "+ inquirerResponse.name);
            console.log("overheads: $"+ inquirerResponse.overheads);
            console.log("__________________________________"); 
            var name = inquirerResponse.name;
            var overheads = inquirerResponse.overheads;
            NewDepartment(name,overheads);
        }
        else {
          console.log("\nPlese make sure the department name and overheads are correct\n");
        }
      });
}

// function to insert product to Database 
function NewDepartment(name,overheads){
    connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: name,
          overhead_costs: overheads
        },
        function(err, res) {
          console.log(name + " department inserted!\n");
          listMenu();
        }
      );
}
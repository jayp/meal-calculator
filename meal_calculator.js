
/*
    Create diner objects which represent a single diner.
    Add dishes to a diner's meal
    Total up the cost of all of the diner's meals
    Add a fixed tax percentage to the total bill
    Add a percentage tip to the total bill
    Split the bill fairly among the diners
        Each diner should pay the tax on their own food
        Each diner should pay an equal share of the tip
    Print out a total bill
    Print a breakdown for what each diner owes
*/

sprintf = require('sprintf').sprintf;

var Dish = function(name, cost) {
  this.name = name;
  this.cost = cost;
}

var Diner = function(name, dishes) {
  this.name = name;
  this.dishes = dishes;
};

var money = function(value) {
  return sprintf("$%0.2f", value);
}

var totalBill = function(diners, tax, tip) {
  var totalFood = 0;
  for (var i in diners) {
    var diner = diners[i];
    diner.food = 0;
    for (var j in diner.dishes) {
      var dish = diner.dishes[j];
      diner.food += dish.cost;
    }
    diner.tax = diner.food * tax;
    totalFood += diner.food;
  }
  var totalTip = totalFood * tip;
  var tipPerPerson = totalTip / diners.length;
  var totalBill = totalFood + (totalFood * tax) + totalTip;
  console.log("Total Bill:", money(totalBill));
  console.log();
  for (var i in diners) {
    var diner = diners[i];
    var dinerTotal = diner.food + diner.tax + tipPerPerson;
    console.log("Total for", diner.name, ":", money(dinerTotal));
    console.log("  Food:", money(diner.food));
    console.log("   Tax:", money(diner.tax));
    console.log("   Tip:", money(tipPerPerson));
    console.log();
  }
}

var joe = new Diner("Joe", [new Dish("Coke", 1.95),
                            new Dish("Eggplant Parmesan", 13.95),
                            new Dish("Brownie", 7.95)]);
var manny = new Diner("Manny", [new Dish("Apple Juice", 3.95),
                                new Dish("Cheese Pizza", 14.95)]);
var moe = new Diner("Moe", [new Dish("Lemonade", 2.95),
                            new Dish("Chile Releno", 12.95)]);
totalBill([joe, manny, moe], 0.0875, 0.18);


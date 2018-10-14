var screenDiv = document.querySelector("p.screen-content");
var numberBtn = document.querySelectorAll(".number");
var operatorBtn = document.querySelectorAll(".operator");
var equalsBtn = document.querySelector(".equals");
var clearBtn = document.querySelector(".clear");
var delBtn = document.querySelector(".delete");
var negativeBtn = document.querySelector(".negative")
var number = "";
var newNumber = "";
var operator = "";

screenDiv.innerHTML = "0";

function testNumLength(number) {
  if (number.length > 11) {
    screenDiv.innerHTML = "Error";
  }
};

for (var i = 0; i < numberBtn.length; i++) {
  numberBtn[i].addEventListener("click", function() {
    number += this.innerHTML;
    testNumLength(number);
    screenDiv.innerHTML = number;
  });
};

negativeBtn.addEventListener("click", function() {
  number = amount(number) * -1;
  number = stringify(number);
  screenDiv.innerHTML = number;
});


for (var i = 0; i < operatorBtn.length; i++) {
  operatorBtn[i].addEventListener("click", function() {
    operator = this.innerHTML;
    newNumber = number;
    number = "";
    screenDiv.innerHTML = operator;
  });
};

equalsBtn.addEventListener("click", function() {
  var result;
  if (operator === "+") {
    result = parsify(number) + parsify(newNumber);
  } else if (operator === "-") {
    result = parsify(newNumber) - parsify(number);
  } else if (operator === "x") {
    result = parsify(number) * parsify(newNumber);
  } else if (operator === "/") {
    result = parsify(newNumber) / parsify(number);
  }
  //Round off the result (15 digits behind the comma) for HTML purposes
  screenDiv.innerHTML = stringify(Math.round(result * 1e15) / 1e15);
  //Store orignal result (not rounded off) in var number
  number = stringify(result);
});

function parsify(value) {
  value = value.replace(",", ".");
  return parseFloat(value, 10);
};

function stringify(value) {
  value = value.toString(10);
  value = value.replace(".", ",");
  return value;
};

clearBtn.addEventListener("click", function() {
  screenDiv.innerHTML = "0";
  number = "";
});

delBtn.addEventListener("click", function() {
  number = number.substring(0, number.length - 1);
  screenDiv.innerHTML = number;
});

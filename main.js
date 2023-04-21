
// Calculator App designed by Nwosa Tochukwu on 4/13/2023


document.addEventListener('DOMContentLoaded', function(){
  // Selectors
  const calculatorContainer = document.querySelector(".calculator-wrapper");
  const calculatorScreenPrev = document.querySelector(
    ".calculator-screen__prev"
  ); //displays the element being calculated
  const calculatorScreenCurr = document.querySelector(
    ".calculator-screen__curr"
  ); // displays the result of the calculation
  const keyButtons = document.querySelector(".calculator-keys");

  //Checks the max number displayed on the screen
  function maxScreenDigit(){
    const maxDigit = 10;
    calculatorScreenCurr.length > maxDigit ? calculatorScreenCurr = calculatorScreenCurr.toExponential(2) : calculatorScreenCurr;
  }

  // makes sure the input doesn't exceed the screen size
  function resizeFontSize() {
    const containerWidth = document.querySelector('.computer-screen');
    let calculatorScreenPrevWidth = calculatorScreenPrev.clientWidth;
    let calculatorScreenCurrWidth = calculatorScreenCurr.clientWidth;
    let maxScreenWidth = Math.floor(containerWidth * 90);
    let calculatorScreenPrevFontSize = 1.5;
    let calculatorScreenCurrFontSize = 1.5;
    
    while (calculatorScreenPrevWidth > maxScreenWidth && calculatorScreenCurrFontSize > 0) {
      calculatorScreenPrevFontSize -= 0.05;
      calculatorScreenPrev.style.fontSize = calculatorScreenPrevFontSize + "rem";
      calculatorScreenPrevWidth = calculatorScreenPrev.clientWidth;
    }
    
    while (calculatorScreenCurrWidth > maxScreenWidth && calculatorScreenCurrFontSize > 0) {
      calculatorScreenCurrFontSize -= 0.05;
      calculatorScreenCurr.style.fontSize = calculatorScreenCurrFontSize + "rem";
      calculatorScreenCurrWidth = calculatorScreenCurr.clientWidth;
    }
  }



  //Event Listeners

  keyButtons.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const keyButton = e.target;
      const action = keyButton.dataset.action;
      const displayedKey = keyButton.textContent;
      const displayedNum = calculatorScreenCurr.textContent;
      const previousKeyType = calculatorContainer.dataset.previousKeyType;

      if (!action) {
        // clearCalculatorScreenCurr();
        if (previousKeyType === "calculate") {
          clearCalculatorScreenCurr();
        }

        if (
          displayedNum === "0" ||
          displayedNum === "operator" ||
          previousKeyType === "clear"
        ) {
          calculatorScreenCurr.textContent = displayedKey; //changes the displayed number to the key-value clicked
        } else {
          if (previousKeyType === "operator") {
            calculatorScreenCurr.textContent =
              displayedNum.slice(0, -1) + displayedKey;
          } else {
            calculatorScreenCurr.textContent += displayedKey;
          }
          calculatorContainer.dataset.previousKeyType = "number"; //sets the previousKeyTyped to number
        }
        calculatorContainer.dataset.previousKey = "number";
      }

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        calculatorScreenCurr.textContent = displayedKey;
        // If the previous key type was an operator, replace it with the new operator
        if (previousKeyType === "operator") {
          calculatorContainer.dataset.operator = action;
          return;
        }
        calculatorContainer.dataset.previousKeyType = "operator";
        const indexOfOperator = displayedNum.search(/[+\-*/]/); //uses regExp to search for all operator characters in the displayed value

        if (indexOfOperator !== -1) {
          //checks if an operator is found in the displayed number and if it is found, set all numbers before it to firstValue
          calculatorContainer.dataset.firstValue = displayedNum.slice(
            0,
            indexOfOperator
          );
        } else {
          //else if no operator is found, set all displayed number as first value
          calculatorContainer.dataset.firstValue = displayedNum;
        }

        calculatorContainer.dataset.operator = action;
        calculatorContainer.dataset.previousKeyType = "operator";
      }

      if (action === "decimal") {
        if (!displayedNum.includes(".")) {
          //checks if the displayed value on screen contains decimal or not
          calculatorScreenCurr.textContent += ".";
        }
        calculatorContainer.dataset.previousKeyType = "decimal";
      }

      if (action === "calculate") {
        const firstValue = parseFloat(calculatorContainer.dataset.firstValue); //gets the first value
        const secondValue = parseFloat(displayedNum); //gets the second value and parseFloat converts it from string to integer. we can as well use parseInt but because we will be dealing with decimal points, parseFloat is the best to use in both firstValue and secondValue scenario

        let result = 0;

        switch (calculatorContainer.dataset.operator) {
          case "add":
            result = firstValue + secondValue;
            break;

          case "subtract":
            result = firstValue - secondValue;
            break;

          case "divide":
            result = firstValue / secondValue;
            break;

          case "multiply":
            result = firstValue * secondValue;
            break;

          default:
            return;
        }

        calculatorContainer.dataset.previousKeyType = "calculate"; //so that it can remember the last operator key pressed/used
        calculatorScreenCurr.dataset.firstValue = result; //firstValue is assigned the result value so that the result can be displayed or use for further calculation
        calculatorScreenCurr.textContent = result; //displays the content of the result
      }

      if (action === "clear") {
        calculatorScreenCurr.textContent = "0";
        calculatorContainer.dataset.firstValue = "";
        calculatorContainer.dataset.operator = "";
      }
      
      if (action === "delete") {
        calculatorScreenCurr.textContent =
          displayedNum.slice(0, -1); //deletes a number from the displayed number
      }
      
      if (action === "percent") {
        calculatorScreenCurr.textContent = displayedNum / 100; //finds the percentage of a number
      }
    }

    function clearCalculatorScreenCurr() {
      // const previousKeyType = calculatorContainer.dataset.previousKeyType;
      calculatorScreenCurr.textContent = "";
      // calculatorContainer.dataset.previousKeyType = "clear";
      // calculatorContainer.dataset.firstValue = "";
      // calculatorContainer.dataset.operator = "";
    }
    maxScreenDigit();
  });
  maxScreenDigit();
  resizeFontSize();
  window.addEventListener("resize", resizeFontSize);
})



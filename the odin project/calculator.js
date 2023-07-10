// Function to update the expression in the display
function updateDisplay(expression) {
    const display = document.getElementById("display");
    display.value = expression;
  }
  
  // Function to add a number or operand to the expression
  function addToExpression(value) {
    const display = document.getElementById("display");
    display.value += value;
  }
  
  // Function to calculate and display the result
  function calculate() {
    const display = document.getElementById("display");
    const expression = display.value;
  
    if (expression) {
      const result = evaluateExpression(expression);
      display.value = expression + " = " + result;
    }
  }
  
  // Function to clear the display and reset the program
  function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
  }
  
  // Function to evaluate a mathematical expression following BODMAS order
  function evaluateExpression(expression) {
    // Helper function to perform the calculation of two numbers with an operator
    function calculate(operator, a, b) {
      if (operator === '/') {
        return a / b;
      } else if (operator === '*') {
        return a * b;
      } else if (operator === '+') {
        return a + b;
      } else if (operator === '-') {
        return a - b;
      }
    }
  
    const operators = ['/', '*', '+', '-'];
    const precedence = {
      '/': 2,
      '*': 2,
      '+': 1,
      '-': 1,
    };
  
    // Remove any whitespace from the expression
    expression = expression.replace(/\s/g, '');
  
    // Stack to hold numbers and operators during evaluation
    const numberStack = [];
    const operatorStack = [];
  
    let currentNumber = '';
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (operators.includes(char)) {
        while (
          operatorStack.length > 0 &&
          precedence[char] <= precedence[operatorStack[operatorStack.length - 1]]
        ) {
          const prevOperator = operatorStack.pop();
          const b = numberStack.pop();
          const a = numberStack.pop();
          const result = calculate(prevOperator, a, b);
          numberStack.push(result);
        }
  
        operatorStack.push(char);
      } else {
        currentNumber += char;
  
        // If the next character is not a digit, push the current number to the stack
        if (i === expression.length - 1 || operators.includes(expression[i + 1])) {
          numberStack.push(parseFloat(currentNumber));
          currentNumber = '';
        }
      }
    }
  
    // Evaluate the remaining operators in the stack
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      const b = numberStack.pop();
      const a = numberStack.pop();
      const result = calculate(operator, a, b);
      numberStack.push(result);
    }
  
    return numberStack[0];
  }
  
  // Example usage with user input
  clearDisplay();
  
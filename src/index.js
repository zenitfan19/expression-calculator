function eval() {    
    return;
}

function expressionCalculator(expr) {
  let exprArr = expressionConvertor(expr);
  let exprArrLength = 0;
  do {
    exprArrLength = exprArr.length;
    for(let i = 0; i < exprArr.length; i++) {
      if(exprArr[i] === '*' || exprArr[i] === '/') {
        if(Array.isArray(exprArr[i-1])) {
          exprArr.splice(i-1, 1, expressionCalculator(exprArr[i-1]));
        }
        if(Array.isArray(exprArr[i+1])) {
          exprArr.splice(i+1, 1, expressionCalculator(exprArr[i+1]));
        }
        let tempResult = calcAction(exprArr[i], exprArr[i-1], exprArr[i+1]);        
        exprArr.splice(i-1, 3, tempResult);        
        break;
      }
    }    
  } while (exprArr.length !==  exprArrLength);
  do {
    exprArrLength = exprArr.length;
    for(let i = 0; i < exprArr.length; i++) {
      if(exprArr[i] === '+' || exprArr[i] === '-') {
        if(Array.isArray(exprArr[i-1])) {
          exprArr.splice(i-1, 1, expressionCalculator(exprArr[i-1]));
        }
        if(Array.isArray(exprArr[i+1])) {
          exprArr.splice(i+1, 1, expressionCalculator(exprArr[i+1]));
        }
        let tempResult = calcAction(exprArr[i], exprArr[i-1], exprArr[i+1]);        
        exprArr.splice(i-1, 3, tempResult);        
        break;
      }
    }    
  } while (exprArr.length !==  exprArrLength);
  return exprArr[0];
}

function calcAction(operator, a, b) {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "/": (a, b) => a / b,
    "*": (a, b) => a * b
  };
  if(operator === '/' && parseFloat(b) === 0) {
    throw 'TypeError: Division by zero.';
  }
  return this.methods[operator](parseFloat(a), parseFloat(b));
}

function expressionConvertor(expr) {
  let arr;
  let newArr;
  if(!Array.isArray(expr)) {
    arr = [];
    if(expr.match(/\(/g) || expr.match(/\)/g)) {
      if(!checkBracketsOrder(expr)) {
        throw 'ExpressionError: Brackets must be paired';
      }    
    }
    if(expr.length > 3) {
      arr  = expr.split(' ');
    } else {
      for (let element of expr) {
        arr.push(element);
      }
    }  
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].length === 0) {
        arr.splice(i, 1);
      }
    }
  } else {
    arr = expr;
  }
  
  newArr = makeArrayFromBrackets(arr);     
  return newArr;
}

function checkBracketsOrder(expr) {
  let openBracketsNum = 0;
  let closeBracketsNum = 0;
  for(let i = 0; i < expr.length; i++) {
    if(expr[i] === '(') {
      openBracketsNum++;
    }
    if(expr[i] === ')') {
      closeBracketsNum++;
    }
  }
  return openBracketsNum === closeBracketsNum;
}

function makeArrayFromBrackets(arr) {
  let finalArr = [];
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] !== '(' && arr[i] !== ')') {
      finalArr.push(arr[i]);
    } else if(arr[i] === '(') {
      let nestedArr = [];
      let nestedBracketsNum = 0;
      while(arr[i+1] !== ')' || nestedBracketsNum !== 0) {
        i++;
        nestedArr.push(arr[i]);
        if(arr[i] === '(') {
          nestedBracketsNum++;
        }
        if(arr[i] === ')') {
          nestedBracketsNum--;
        }
      }      
      finalArr.push(nestedArr);                  
    }
  }
  return finalArr;
}

module.exports = {
    expressionCalculator
}
let initialValue = "";
let arithmaticalOp = 0;
let display, sign, numericalValue;

const takevalue = (value) => {
  display = document.getElementById('input');
  // if((v === "+" || v === "*" || v === "/") && display.value === "" ){
  //   display.slice(0,1);
  // }
  if ((value === "+" || value === "-" || value === "*" || value === "/") && arithmaticalOp === 0) {
    display = document.getElementById('input');
    display.value += value
    arithmaticalOp = 1;
    initialValue = "";
  }
  else {
    if (!(value === "+" || value === "-" || value === "*" || value === "/")) {
      display = document.getElementById("input");
      display.value += value;
      initialValue += value;
      arithmaticalOp = 0;
    }
  }
}

const cancel = () => {
  arithmaticalOp = 0;
}
const del = () => {
  display.value = "";
  initialValue = "";
  arithmaticalOp = 0;
}

const calculation = () => {
  let inputdata = document.getElementById('input');
  let functioneval = calc(inputdata.value);
  document.getElementById('input').value = functioneval;
}
const nodecimal = (value) => {
  if (initialValue.length == 0) {
    display = document.getElementById("input");
    display.value += "0";
    console.log(display);
    display.value += value;
    initialValue += value;
  }
  if (!initialValue.includes(".")) {
    display = document.getElementById("input");
    display.value += value;
    initialValue += value;
  }
}


const calc = (value) => {
  sign = value.match(/[+\-*/]/g);
  numericalValue = value.split(/[+\-*/]/).map(function (item) {
    return parseFloat(item);
    // console.log(numericalValue);
  });
  let arr = [];
  numericalValue.forEach((element) => {
    if (typeof element === "number" && !isNaN(element)) {
      arr.push(element);
      // console.log(arr[0]);
    }
  });
  if (value[0] == "-" || value[0] == "+") {
    if (value[0] == "+") {
      sign.splice(0, 1);
      // console.log(sign.splice(0, 1));
    } else {
      sign.splice(0, 1);
      arr[0] = -1 * arr[0];
    }
  }
  console.log(sign);
  console.log(arr);
  for(let i=0;i<sign.length;i++) {
    if (sign[i] === "*") {
      arr[i] = arr[i] * arr[i + 1];
      arr.splice(i + 1, 1);
      sign.splice(i, 1);
      i--;
    } else if (sign[i] === "/") {
      arr[i] = arr[i] / arr[i + 1];
      arr.splice(i + 1, 1);
      sign.splice(i, 1);
      i--;
    }
  }
  let answer = arr[0];
  sign.forEach((num, i) => {
    // if (num === "+") {
    //   answer = arr[i + 2];
    // } else if (num === "-") {
    //   answer = arr[i + 2];
    // }
    if (num === "+") {
      answer += arr[i + 1];
    } else if (num === "-") {
      answer -= arr[i + 1];
    }
  });
  if (isNaN(answer) || !isFinite(answer)) {
    cancel();
    document.getElementById("input").innerHTML = "NaN";
  }
  return answer;
}
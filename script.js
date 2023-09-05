let cv = "";
let arithmaticalop = 0;
let display, sign, fixed;

const takevalue = (v) => {
  display = document.getElementById('input');
  // if((v === "+" || v === "*" || v === "/") && display.value === "" ){
  //   display.slice(0,1);
  // }
  if ((v === "+" || v === "-" || v === "*" || v === "/") && arithmaticalop === 0) {
    display = document.getElementById('input');
    display.value += v
    arithmaticalop = 1;
    cv = "";
  }
  else {
    if (!(v === "+" || v === "-" || v === "*" || v === "/")) {
      display = document.getElementById("input");
      display.value += v;
      cv += v;
      arithmaticalop = 0;
    }
  }
}

const cancel = () => {
  arithmaticalop = 0;
}
const del = () => {
  display.value = "";
  cv = "";
  arithmaticalop = 0;
}

const calculation = () => {
  let inputdata = document.getElementById('input');
  let functioneval = calc(inputdata.value);
  document.getElementById('input').value = functioneval;
}
const nodecimal = (v) => {
  if (cv.length == 0) {
    display = document.getElementById("input");
    display.value += "0";
    console.log(display);
    display.value += v;
    cv += v;
  }
  if (!cv.includes(".")) {
    display = document.getElementById("input");
    display.value += v;
    cv += v;
  }
}


const calc = (v) => {
  sign = v.match(/[+\-*/]/g);
  fixed = v.split(/[+\-*/]/).map(function (item) {
    return parseFloat(item);
    // console.log(fixed);
  });
  let arr = [];
  fixed.forEach((element) => {
    if (typeof element === "number" && !isNaN(element)) {
      arr.push(element);
      // console.log(arr[0]);
    }
  });
  if (v[0] == "-" || v[0] == "+") {
    if (v[0] == "+") {
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
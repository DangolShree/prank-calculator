const allBtns = [...document.getElementsByClassName("btn")];

let strToDisplay = "";

const operators = ["%", "/", "*", "+", "-"];

let lastOperator = "";

const audio = new Audio("./audio/error.mp3");

const displaElm = document.querySelector(".display");
console.log(displaElm);

allBtns.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    displaElm.style.background = "";
    displaElm.style.color = "";
    displaElm.classList.remove("prank");

    const val = btn.innerText;

    if (val === "AC") {
      strToDisplay = "";
      disply(strToDisplay);
      return;
    }

    if (val === "C") {
      const str = strToDisplay.slice(0, -1);
      return disply(strToDisplay);
    }

    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay

        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }

    if (val === ".") {
      const indexOfLastOperator = strToDisplay.lastIndexOf(lastOperator);
      const lasNumberset = strToDisplay.slice(indexOfLastOperator);

      if (lasNumberset.includes(".")) {
        return;
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
      if (strToDisplay.includes(".")) {
        return;
      }
    }

    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay

        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    strToDisplay += val;
    disply(strToDisplay);
  });
});

const disply = (str) => {
  displaElm.innerText = str || "0.00";
};

const total = () => {
  const extraVal = randomNumber();
  if (extraVal) {
    audio.play();
    displaElm.style.background = "red";
    displaElm.style.color = "white";
    displaElm.classList.add("prank");
  }

  const ttl = eval(strToDisplay) + extraVal;
  disply(ttl);
  strToDisplay = ttl.toString();
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  alert(num);
  return num < 10 ? num : 0;
};

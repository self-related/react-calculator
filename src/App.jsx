import { useState } from 'react';
import './App.css';

function Buttons({ onButtonClick }) {
  const handleClick = (event) => {
    onButtonClick(event.target.innerText);
  };
  
  return (
    <div id="buttons-div">
      <button id="clear" onClick={handleClick}>AC</button>
      <button id="divide" onClick={handleClick}>/</button>
      <button id="multiply" onClick={handleClick}>x</button>
      <div id='num-buttons'>
        <button id="seven" onClick={handleClick}>7</button>
        <button id="eight" onClick={handleClick}>8</button>
        <button id="nine" onClick={handleClick}>9</button>
        <button id="four" onClick={handleClick}>4</button>
        <button id="five" onClick={handleClick}>5</button>
        <button id="six" onClick={handleClick}>6</button>
        <button id="one" onClick={handleClick}>1</button>
        <button id="two" onClick={handleClick}>2</button>
        <button id="three" onClick={handleClick}>3</button>
        <button id="zero" onClick={handleClick}>0</button>
        <button id="decimal" onClick={handleClick}>.</button>
    </div>
      <button id="subtract" onClick={handleClick}>-</button>
      <button id="add" onClick={handleClick}>+</button>
      <button id="equals" onClick={handleClick}>=</button>
    </div>
  );
}

function Display({currentValue, secondValue}) {

  return (
    <div id="display">{secondValue || currentValue}</div>
  );
}

function Calculator() {
  const [currentValue, setCurrentValue] = useState(0);
  const [action, setAction] = useState(null);
  const [secondValue, setSecondValue] = useState(null);

  const onButtonClick = (buttonValue) => {
    const doCalc = () => {
      let result;
      switch (action) {
        case "+":
          result = Number(currentValue) + Number(secondValue);
          break;
        
        case "-":
          result = Number(currentValue) - Number(secondValue);
          break;

        case "x":
          result = Number(currentValue) * Number(secondValue);
          break;

        case "/":
          if (secondValue == 0) {
            window.alert("You are not allowed to divide by 0");
            result = Number(currentValue);
            break;
          }
          result = Number(currentValue) / Number(secondValue);
          break;
      }

      setCurrentValue(result);
      setAction(null);
      setSecondValue(null);
    };

    const checkLastDot = () => {
      let result = false;
      if (secondValue) {
        result = `${secondValue}`.split("").includes(".");
      } else {
        result = `${currentValue}`.split("").includes(".");
      }
      console.log("dot is " + result);
      return result;
    };

    if (buttonValue === "AC") {
      setCurrentValue(0);
      setAction(null);
      setSecondValue(null);
    }


    if (!isNaN(buttonValue) || buttonValue === ".") {
      switch (action) {

        case null: 
          if (buttonValue === "." && checkLastDot()) {
            return;
          }
          setCurrentValue((currentValue) => {
            if (currentValue == 0) {
              
              return buttonValue;
            } else {
    
              return currentValue + buttonValue;
            }
          });
          break;

         default:
          if (buttonValue === "." && checkLastDot()) {
            return;
          }
          setSecondValue((secondValue) => {
            if (secondValue === null || secondValue === 0) {
              
              return buttonValue;
            } else {

              return secondValue + buttonValue;
            }
          });
          break;
      }
    }

    if (isNaN(buttonValue) && buttonValue !== "." && buttonValue !== "AC" && buttonValue !== "=") {
      switch (secondValue) {
        case null:
          if (buttonValue === "-" && action) {
            setSecondValue("-");
            break;
          }
          setAction(buttonValue);
          console.log("action set" + buttonValue);
          break;
        case "-":
          setAction(buttonValue);
          setSecondValue(null);
          console.log("action set" + buttonValue);
          break;
        default:
          doCalc();
          setAction(buttonValue);
          console.log("action set" + buttonValue);
          break;
      }
    }

    if (buttonValue === "=" && secondValue !== null) {
      doCalc();
    }

  };

  return (
    <div id="calculator">
      <Display currentValue={currentValue} secondValue={secondValue} />
      <Buttons onButtonClick={onButtonClick} />
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Calculator />
    </>
  );
}

export default App;

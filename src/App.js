import { useState } from "react";
import './App.scss';

function App() {
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("0");

  const display = (symbol) => {
    if (symbol === "0" && answer === "0") return;
    if (symbol !== "0" && answer === "0") {
      setAnswer("")
    };
    //understand why this can not go below the next if statement?
    setAnswer((prev) => prev + symbol);
    setExpression((prev) => prev + symbol);
    if (expression[expression.length - 1] === "=") {
      if (symbol) {
        setExpression(symbol)
        setAnswer(symbol)
      };
    };
  };

  const handleDecimal = () => {
    //takes out operators...understand a little more why?
    const splitted = expression.split(/[+\-*/]/);
    //chooses last element
    const last = splitted.slice(-1)[0];
    //two "." in one number should not be accepted
    if (!last.includes('.')) {
      setExpression(expression + '.');
      setAnswer(expression + '.');
    };

    if (expression[expression.length - 1] === "=") {
      if (".") {
        setExpression(expression + "0.");
        setAnswer("0.");
      };
    };
  };

  const ops = ['/', '*', '+', '-'];

  const operations = (value) => {
    
    /*if (
      (ops.includes(value) && answer === "0") ||
      (ops.includes(value) && ops.includes(expression.slice(-1)))
    ) {
      return;
    }*/
    if (expression[expression.length - 1] === value) {
      if (ops) {
        return expression[expression.length - 1] + value;
      };
    };

    let newCalc = expression;
    
    if (ops.includes(value) && answer !== "0") {
      setExpression(expression + value);
      console.log(expression)
      //setDisplay(calc);
    };
    if (value !== "-") {
      newCalc = newCalc.replace(/[*/+-]+$/, "");
      console.log(newCalc)
    };
    setExpression(newCalc + value);
    setAnswer(value);

    /*setExpression(expression + value);
    setAnswer("");*/
    if (expression[expression.length - 1] === "=") {
      if (ops) {
        setExpression(answer + value)
        setAnswer(answer + value)
      }
    };
  };

  const total = () => {
    setAnswer(eval(expression));
    setExpression(prev => prev + "=");
  };

  const clear = () => {
    setExpression("");
    setAnswer("0");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="scr">
          <input type="text" value={expression} placeholder="0" disabled />
          <div className="total" id="display">{answer}</div>
        </div>
        <div onClick={clear} className="buttons cle" id="clear">AC</div>
        <div onClick={() => operations("/")} className="buttons div" id="divide">/</div>
        <div onClick={() => operations("*")} className="buttons mul" id="multiply">*</div>
        <div onClick={() => display("7")} className="buttons sev" id="seven">7</div>
        <div onClick={() => display("8")} className="buttons eig" id="eight">8</div>
        <div onClick={() => display("9")} className="buttons nin" id="nine">9</div>
        <div onClick={() => operations("-")} className="buttons sub" id="subtract">-</div>
        <div onClick={() => display("4")} className="buttons fou" id="four">4</div>
        <div onClick={() => display("5")} className="buttons fiv" id="five">5</div>
        <div onClick={() => display("6")} className="buttons si" id="six">6</div>
        <div onClick={() => operations("+")} className="buttons ad" id="add">+</div>
        <div onClick={() => display("1")} className="buttons on" id="one">1</div>
        <div onClick={() => display("2")} className="buttons tw" id="two">2</div>
        <div onClick={() => display("3")} className="buttons thr" id="three">3</div>
        <div onClick={total} className="buttons equ" id="equals">=</div>
        <div onClick={() => display("0")} className="buttons zer" id="zero">0</div>
        <div onClick={handleDecimal} className="buttons dec" id="decimal">.</div>
      </div>
    </div>
  );
}

export default App;

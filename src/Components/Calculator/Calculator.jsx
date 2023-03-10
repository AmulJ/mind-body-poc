import Button from "./Button/Button";
import { useState } from "react";
import "./Calculator.css"

const calculatorButtonValues = [
  ["C", "+", "-", "x"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "%"],
  ["1", "2", "3", "."],
  ["", "0", "", "="],
];

const Calculator = () =>{
  const [total, setTotal] = useState(0);
  const [num, setNum] = useState('');
  const [sign, setSign] = useState('');

  // Reset on C
  const resetClickHandler = () =>{
    setNum('');
    setTotal(0)
    setSign('')
  }

  // Handle % click
  const percentClickHandler = () => {
    setNum((_num)=> _num /= Math.pow(100, 1))
  }

  // Handle equal click based on current sign
  const equalsClickHandler = () => {
    let _total = total;
    switch(sign){
      case "+":  
        _total += Number(num);
        break;
      case "-":
        _total -= Number(num);
        break;
      case "x":
        _total = _total * Number(num);
        break;
      case "/":
        _total = _total/Number(num);
        break;
      default:
          break;
    }

    setNum(_total);
    setSign('')
  }

  // Assign sign
  const signClickHandler = (text) => {
    setSign(text);
    setTotal(Number(num));
    setNum('')
  }

  // Handle dot
  const dotClickHandler = () =>{
    if(!num.toString().includes('.')){
      setNum((old)=> old + '.')
    } 
  }

  // Handle every number click
  const numClickHandler = (text) => {
    // Do not allow multiple zeros
    if(num.length === 1 && num === '0' && text === '0') return


    // If first value is 0 and then some interger other than 0, replace the first 0
    setNum((old)=> old.length === 1 && old === '0' ? text : old + text)
  }

  return <div className="calculator-parent">
    <div className="container">
      <div className="field">{num}</div>
      {calculatorButtonValues.map((rowArray, rowIndex) => {
      return (
        <div key={rowIndex} className="row">
          {rowArray.map((text, index) => {
            return (
              <Button 
                key={index}
                text={text}
                resetClickHandler={resetClickHandler}
                percentClickHandler={percentClickHandler}
                equalsClickHandler={equalsClickHandler}
                signClickHandler={signClickHandler}
                numClickHandler={numClickHandler}
                dotClickHandler={dotClickHandler}>
              </Button>
            )
          })}
        </div>
      );
    })}
    </div>
  </div>
}

export default Calculator;
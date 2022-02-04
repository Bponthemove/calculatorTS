import React from 'react'
import { Output } from './components/output'
import { Operator } from './components/operator'
import { Equals } from './components/equals'
import { Numbers } from './components/numbers'
import './App.css';

export const App: React.FC = () => {

  return (
    <div className="main-container-outer">
      <h1>Calculator</h1>
      <div className="main-container-inner">
          <Output/>
          <div className="btn-container">
            {[
              {text: "divide", symbol: "/"}, 
              {text: "multiply", symbol: "*"}, 
              {text: "subtract", symbol: "-"}, 
              {text: "add", symbol: "+"},
              {text: "clear", symbol: "AC"},
            ].map(operator => {
              return (
                <Operator key={operator.text} 
                          operator={operator.symbol} 
                          id={operator.text}
                />
              )
            })}
            <Equals/>
            <Numbers/>
          </div>
      </div>
      <footer>Bponthemove, Oct 2021</footer>
    </div>
  );
}



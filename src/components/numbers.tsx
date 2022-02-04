import { useContext } from "react"
import { MainContext } from "../Context/LogicContext"

export const Numbers = () => {
    const value = useContext(MainContext)
    const { clickHandleNumbers, clickHandleDecimal, clickHandlePlusMinus } = value

        return(
            <div className="number-container">
                <div className="btn" id="nine" onClick={clickHandleNumbers}>9</div>
                <div className="btn" id="eight" onClick={clickHandleNumbers}>8</div>
                <div className="btn" id="seven" onClick={clickHandleNumbers}>7</div>
                <div className="btn" id="six" onClick={clickHandleNumbers}>6</div>
                <div className="btn" id="five" onClick={clickHandleNumbers}>5</div>
                <div className="btn" id="four" onClick={clickHandleNumbers}>4</div>
                <div className="btn" id="three" onClick={clickHandleNumbers}>3</div>
                <div className="btn" id="two" onClick={clickHandleNumbers}>2</div>  
                <div className="btn" id="one" onClick={clickHandleNumbers}>1</div>
                <div className="btn" id="zero" onClick={clickHandleNumbers}>0</div>
                <div className="btn" id="decimal" onClick={clickHandleDecimal}>.</div>
                <div className="btn" id="plusMinus" onClick={clickHandlePlusMinus}>±</div>    
            </div>       
        )
}

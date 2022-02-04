import { useContext } from "react"
import { MainContext } from "../Context/LogicContext"

export const Output = () => {
    const value = useContext(MainContext)
    const { resultToggle, input, operator, result, output } = value

    if(!resultToggle) {
        return (
            <div id="display-container">
                <div id="display">{input}</div>
                <div id="sec-display">{result} {operator}</div>
            </div>
        )
    } else {
        return (
            <div id="display-container">
                <div placeholder='0' id="display"> {result}</div>
                <div id="sec-display">{ output }</div>
            </div>
        )
    }
}

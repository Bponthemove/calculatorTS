import { useContext } from "react"
import { MainContext } from "../Context/LogicContext"

export const Equals = () => {
    const value = useContext(MainContext)
    const { clickHandleEquals } = value

    return(
        <div id="equals" className="btn" onClick={clickHandleEquals}>=</div>        
    )
}

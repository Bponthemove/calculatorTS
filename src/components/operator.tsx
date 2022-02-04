import { useContext } from "react"
import { MainContext } from "../Context/LogicContext"

export const Operator = ({id, operator}: {id: string, operator: string}) => {
    const value = useContext(MainContext)
    const { clickHandleOperator, clickHandleClear } = value

    return (
        <div id={id} className="btn" onClick={id==="clear" ? clickHandleClear : clickHandleOperator}>{operator}</div>
    )
}


import { useContext, useState, createContext } from 'react'

type LogicContextTypes = {
    input: string;
    output: string;
    operator: any;
    result: number | string;
    resultToggle: boolean;
    operatorToggle: boolean;
    clickHandleOperator: (e: React.MouseEvent<HTMLDivElement>) => void;
    clickHandleClear: () => void;
    clickHandleEquals: () => void;
    clickHandleDecimal: () => void;
    clickHandleNumbers: (e: React.MouseEvent<HTMLDivElement>) => void;
    clickHandlePlusMinus: () => void;
}


export const MainContext = createContext<LogicContextTypes>({
    input: '0',
    output: '',
    operator: '',
    result: 0,
    resultToggle: false,
    operatorToggle: false,
    clickHandleOperator: () => {},
    clickHandleClear: () => {},
    clickHandleEquals: () => {},
    clickHandleDecimal: () => {},
    clickHandleNumbers: () => {},
    clickHandlePlusMinus: () => {}
})

export const MainContextProvider: React.FC = ({ children }) => {

    const [resultToggle, setResultToggle] = useState(false)
    const [operatorToggle, setOperatorToggle] = useState(false)
    const [numberToggle, setNumberToggle] = useState(false)
    const [operator, setOperator] = useState('')
    const [input, setInput] = useState('0')
    const [inputPrev, setInputPrev] = useState<string | number>('')
    const [output, setOutput] = useState('')
    const [result, setResult] = useState<string | number>(0)
    
    //*******************************************//
    //______________AC btn handler_______________//
    //*******************************************//

    const clickHandleClear = () => {
        setResultToggle(false)
        setOperatorToggle(false)
        setNumberToggle(false)
        setOperator('')
        setInput('0')
        setInputPrev('')
        setOutput('')
        setResult(0) 
    }

    //***********************************************//
    //____________Operator btn handler_______________//
    //***********************************************//

    const clickHandleOperator = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (inputPrev === '' || input === '') {
        //no calculations, just updating state
            if (!operatorToggle) {
                //no operator yet chosen, just update operator state
                setOperator(target.innerText)
                setOperatorToggle(true)
                setResult(input)
                setInputPrev(input)
                setResultToggle(false)
                setInput('') 
            } else {
                //already operator chosen 
                setOperator(target.innerText)
            }
            return
        } 
        else if (input === '0') {
            //operator chosen after equals
            setResultToggle(false)
            setOperatorToggle(true)
            setNumberToggle(false)
            setOperator(target.innerText)
            return
        } else {
            let calculation: number | undefined

            if (operator === '/') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) / parseFloat(input)
                } else {
                    calculation = inputPrev / parseFloat(input)
                }
            }
            if (operator === '*') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) * parseFloat(input)
                } else {
                    calculation = inputPrev * parseFloat(input)
                }
            }
            if (operator === '+') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) + parseFloat(input)
                } else {
                    calculation = inputPrev + parseFloat(input)
                }
            }
            if (operator === '-') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) - parseFloat(input)
                } else {
                    calculation = inputPrev - parseFloat(input)
                }
            }
            if (typeof calculation === 'number') {
                setResult(Math.round(parseFloat((calculation * Math.pow(10, 4)).toFixed(4))) / Math.pow(10, 4))
                //result toggle true so calculate calculation and use that as prev state
                setResultToggle(false)
                setInput('')
                setOperator(target.innerText)
                setInputPrev(calculation)
            }
        }
    }
        
    
    //*********************************************//
    //____________Number btn handler_______________//
    //*********************************************//

    const clickHandleNumbers = (e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (!numberToggle) {
        //numbertoggle is false means it is the first time a number is pressed 
            if (input !== '0') {
                //state is not '0' means we are updating to state
                setInput(prevState => prevState + target.innerText)
                setNumberToggle(true)
                setOperatorToggle(false)
            } else {
                //if state is '0' means we are making new state
                setInput(target.innerText) 
            }
            return
        } else {
        //numbertoggle is true so we are updating state
            setInput(prevState => prevState + target.innerText)
        }
    }

    //*************************************************//
    //____________Plus Minus btn handler_______________//
    //*************************************************//

    const clickHandlePlusMinus = () => {
        if (input.split('')[0] === '-') {
            setInput(prevState => prevState.slice(1))
        } else {
            setInput(prevState => '-' + prevState)
        }
    }
        
    
    //**********************************************//
    //____________Decimal btn handler_______________//
    //**********************************************//

    const clickHandleDecimal = () => {
        //first no input yet so leave 0 and add decimal 
        if (input.slice(-1) !== "." && input.search(/\./) === -1) {
            setInput(prevState => prevState + ".")
        }
    }

    //*********************************************//
    //____________Equals btn handler_______________//
    //*********************************************//
    const clickHandleEquals = () => {
        if (inputPrev === '') {
            //if equals is clicked directly after the first number input, without operator
            setResult(input)
            setResultToggle(true)
            setOutput(input)
            return
        }
        else if (inputPrev !== '' && input === '') {
            //if equals is clicked after the operator, without a second number input
            let calculation: number | undefined
            if (operator === '/') {
                calculation = 1
            }
            if (operator === '*') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev)**2
                } else {
                    calculation = inputPrev**2
                }
            }
            if (operator === '-') {
                calculation = 0
            }
            if (operator === '+') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev)*2
                } else {
                    calculation = inputPrev*2
                }
            }
            if (typeof calculation === 'number') {
                setResult(Math.round(parseFloat((calculation * Math.pow(10, 4)).toFixed(4))) / Math.pow(10, 4))
                setResultToggle(true)
                setOperatorToggle(false)
                setOutput(`${inputPrev} ${operator} ${inputPrev} =`)
                return
            }
        } else {
            let calculation: number | undefined
            
            if (operator === '/') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) / parseFloat(input)
                } else {
                    calculation = inputPrev / parseFloat(input)
                }
            }
            if (operator === '*') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) * parseFloat(input)
                } else {
                    calculation = inputPrev * parseFloat(input)
                }
            }
            if (operator === '+') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) + parseFloat(input)
                } else {
                    calculation = inputPrev + parseFloat(input)
                }
            }
            if (operator === '-') {
                if (typeof inputPrev === 'string') {
                    calculation = parseFloat(inputPrev) - parseFloat(input)
                } else {
                    calculation = inputPrev - parseFloat(input)
                }
            }
            if (typeof calculation === 'number') {
                setResult(Math.round(parseFloat((calculation * Math.pow(10, 4)).toFixed(4))) / Math.pow(10, 4))
                setResultToggle(true)
                setOperatorToggle(false)
                setOutput(`${inputPrev} ${operator} ${input} =`)
                setInputPrev(calculation)
                setInput('0')
            }
        }
    }

    const value = { 
        input, 
        output, 
        operator,
        result,
        resultToggle,
        operatorToggle,
        clickHandleDecimal,
        clickHandleEquals,
        clickHandleNumbers,
        clickHandleClear,
        clickHandleOperator,
        clickHandlePlusMinus,
    }

    return (
        <MainContext.Provider value={value} >
            { children }
        </MainContext.Provider>
    )    
}


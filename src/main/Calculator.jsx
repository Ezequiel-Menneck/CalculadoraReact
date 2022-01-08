import { useState } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'


export default props => {

    const [displayValue, setDisplayValue] = useState("0")
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operation, setOperation] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [current, setCurrent] = useState(0)
    
    function clearMemory() {
        setDisplayValue("0")
        setClearDisplay(false)
        setOperation(null)
        setValues([0, 0])
        setCurrent(0)
    }

    function addOperation(operacao) {
        if (current === 0) {
            setOperation(operacao)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const equals = operation === '='
            const currentOperation = operation

            const newValue = values
            newValue[0] = eval(`${newValue[0]} ${currentOperation} ${newValue[1]}`)
            newValue[1] = 0

            setDisplayValue(newValue[0])
            setOperation(equals ? null : operacao)
            setCurrent(equals ? 0 : 1)
            setClearDisplay(!equals)
            setValues(newValue)
        }
        
    }

    function addDigito(n) {
        if (n === '.' && displayValue.includes('.')) {
            return
        }

        const displayClear = displayValue === '0' || clearDisplay
        const currentValue = displayClear ? '' : displayValue
        const valueDisplay = currentValue + n
        setDisplayValue(valueDisplay)
        setClearDisplay(false)

        if (n !== '.') {
            const i = current
            const newValue =parseFloat(valueDisplay)
            const newNumb = [values]
            newNumb[i] = newValue
            setValues(newNumb)
        }
    }

    return (
        <div className="calculator">
            <Display valor={displayValue}></Display>
            <div>
            <Button label="AC" click={clearMemory} buttonAC></Button>
            <Button label="/" click={addOperation} operation></Button>
            </div>
            <div>
            <Button label="7" click={addDigito}></Button>
            <Button label="8" click={addDigito}></Button>
            <Button label="9" click={addDigito}></Button>
            <Button label="*" click={addOperation} operation></Button>
            </div>
            <div>
            <Button label="4" click={addDigito}></Button>
            <Button label="5" click={addDigito}></Button>
            <Button label="6" click={addDigito}></Button>
            <Button label="-" click={addOperation} operation></Button>
            </div>
            <div>
            <Button label="1" click={addDigito}></Button>
            <Button label="2" click={addDigito}></Button>
            <Button label="3" click={addDigito}></Button>
            <Button label="+" click={addOperation} operation></Button>
            </div>
            <div>
            <Button label="0" click={addDigito} button0></Button>
            <Button label="." click={addDigito}></Button>
            <Button label="=" click={addOperation} operation></Button>
            </div>
        </div>
    )
}
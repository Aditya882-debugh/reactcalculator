import './Components/Calculator.css';
import { useReducer } from 'react';
import { Digitbutton } from './Components/Digitbutton';
import { Operation } from './Components/operation';
import logo from './Components/Images/logo.png'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CANCEL: 'cancel',
  EVALUATE: 'evaluate',
  DELETE: 'delete'
}

function App() {


  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:

        if (payload.digit == '.' && payload.operation !== '' && state.currentoperand == '') {
          return {
            ...state,
            overwrite: false,
            currentoperand: `0${payload.digit}`
          }
        }
        if (payload.digit == '0' && state.currentoperand == '0') {
          return {
            ...state
          }
        }
        if (state.overwrite && payload.digit == '.') {
          return {
            ...state,
            overwrite: false,
            currentoperand: `0${payload.digit}`
          }
        }
        if (payload.digit == '.' && state.currentoperand == null) {
          return {
            ...state,
            currentoperand: `0${payload.digit}`
          }
        }
        if (payload.digit == "." && state.currentoperand.includes(".")) {
          return state
        }

        if (state.overwrite == true) {
          return {
            ...state,
            overwrite: false,
            currentoperand: '' + payload.digit
          }
        }
        if (state.currentoperand == 'Result is undefined' && payload.digit !== '.') {
          return {
            ...state,
            overwrite: false,
            currentoperand: payload.digit
          }
        }
        if (state.currentoperand == 'Result is undefined' && payload.digit == '.') {
          return {
            ...state,
            overwrite: false,
            currentoperand: `0${payload.digit}`
          }
        }
        return {
          ...state,
          currentoperand: `${state.currentoperand || ""}${payload.digit}`
        }
      case ACTIONS.CANCEL:
        return {
          ...state,
          currentoperand: null,
          previousoperand: null,
          operation: ''
        }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentoperand == null && state.previousoperand == null) {
          return {
            ...state,
          }
        }
        if (state.previousoperand == null) {
          return {
            ...state,
            previousoperand: state.currentoperand,
            currentoperand: '',
            operation: payload.operation
          }
        }
        if (state.operation.includes('÷') && state.currentoperand == 0 && state.previousoperand == 0) {
          return {
            ...state,
            previousoperand: '',
            operation: '',
            currentoperand: 'Result is undefined'
          }
        }
        if (state.currentoperand == '') {
          return {
            ...state,
            operation: payload.operation
          }
        }
        if (state.previousoperand !== '') {
          return {
            ...state,
            previousoperand: evaluate(state),
            currentoperand: '',
            operation: payload.operation
          }
        }
        if (state.currentoperand == 'Result is undefined') {
          return {
            ...state
          }
        }
        return {
          ...state,
          previousoperand: `${state.currentoperand}`,
          currentoperand: '',
          operation: payload.operation
        }
      case ACTIONS.EVALUATE:
        if (state.previousoperand !== '' && state.currentoperand == '') {
          return {
            ...state
          }
        }
        if (state.previousoperand == '') {
          return {
            ...state,
            currentoperand: state.currentoperand
          }
        }
        if (state.currentoperand == '') {
          return {
            ...state,
            currentoperand: evaluate(state)
          }
        }

        if (state.currentoperand !== null && state.previousoperand == null) {
          return {
            ...state,
          }
        }
        if (state.previousoperand == 0 && state.currentoperand == 0 && state.operation == '÷') {
          return {
            ...state,
            previousoperand: '',
            currentoperand: 'Result is undefined',
            operation: ''
          }
        }
        return {
          ...state,
          overwrite: true,
          currentoperand: evaluate(state),
          previousoperand: '',
          operation: ''
        }
      case ACTIONS.DELETE:
        if (state.overwrite) {
          return {
            ...state,
          }
        }
        if (state.currentoperand == null && state.previousoperand == null) {
          return {
            ...state,
            currentoperand: '',
            previousoperand: ''
          }
        }
        if (state.currentoperand == 'Result is undefined') {
          return {
            ...state,
          }
        }
        return {
          ...state,
          currentoperand: `${state.currentoperand}`.slice(0, -1)
        }
    }
  }
  function Delete() {
    dispatch({ type: ACTIONS.DELETE })
  }
  function evaluate({ currentoperand, previousoperand, operation }) {
    const current = parseFloat(currentoperand)
    const prev = parseFloat(previousoperand)
    if (isNaN(prev)) return ""
    let computation = ''
    switch (operation) {
      case '+':
        computation = prev + current
        break;
      case '-':
        computation = prev - current
        break;
      case '×':
        computation = prev * current
        break;
      case '÷':
        computation = prev / current
        break;
      case '%':
        computation = prev % current
    }
    return computation.toString()
  }
  const [{ previousoperand, currentoperand, operation }, dispatch] = useReducer(reducer, {})


  // style = {{ color: "rgb(226, 82, 82)" }

  return (
    <>
      <div className="calculator-grid">
        <div className="operand">
          <div className="previous-operand">{previousoperand}{operation}</div>
          <div className="current-operand">{currentoperand}</div>
        </div>
        <button onClick={() => { dispatch({ type: ACTIONS.CANCEL }) }}>C</button>
        <button onClick={Delete}><img className='deletelogo' src={logo} style={{ background: '#144168' }} alt="" /></button>
        <Operation operation='%' dispatch={dispatch} />
        <Operation operation='÷' dispatch={dispatch} />
        <Digitbutton digit='7' dispatch={dispatch} />
        <Digitbutton digit='8' dispatch={dispatch} />
        <Digitbutton digit='9' dispatch={dispatch} />
        <Operation operation='×' dispatch={dispatch} />
        <Digitbutton digit='4' dispatch={dispatch} />
        <Digitbutton digit='5' dispatch={dispatch} />
        <Digitbutton digit='6' dispatch={dispatch} />
        <Operation operation='-' dispatch={dispatch} />
        <Digitbutton digit='1' dispatch={dispatch} />
        <Digitbutton digit='2' dispatch={dispatch} />
        <Digitbutton digit='3' dispatch={dispatch} />
        <Operation operation='+' dispatch={dispatch} />
        <Digitbutton digit='0' dispatch={dispatch} />
        <Digitbutton digit='.' dispatch={dispatch} />
        <button id='Evaluate' style={{ position: 'relative' }} onClick={() => { dispatch({ type: ACTIONS.EVALUATE }) }}>=</button>
      </div>
    </>
  );
}


export default App;

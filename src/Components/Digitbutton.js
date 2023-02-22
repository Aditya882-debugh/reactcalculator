import { ACTIONS } from "../App"
export function Digitbutton({ digit, dispatch }) {
    return <button onClick={() => { dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } }) }}>{digit}</button>
}
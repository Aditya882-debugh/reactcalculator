import { ACTIONS } from "../App"

export function Operation({ dispatch, operation }) {
    return <button style={{ color: 'rgb(226, 82, 82)' }} onClick={() => { dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } }) }}>{operation}</button>
}
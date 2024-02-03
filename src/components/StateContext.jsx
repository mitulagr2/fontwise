import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { initialFilter, preview_type } from '../constants'

const StateContext = createContext(null)
const StateDispatchContext = createContext(null)

const StateProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useRef(searchParams)

  const reducer = useCallback((state, action) => {
    if (initialFilter[action.property] === action.payload) action.type = 'UNSET'

    switch (action.type) {
      case 'SET':
        params.current.set(action.property.replace('_', '.'), action.payload)
        state = {
          ...state,
          [action.property]: action.payload,
        }
        break
      case 'UNSET':
        params.current.delete(action.property.replace('_', '.'))
        state = {
          ...state,
          [action.property]: initialFilter[action.property],
        }
        break
      case 'RESET':
        params.current = new URLSearchParams()
        state = initialFilter
        break
      default:
    }
    return state
  }, [])

  const [state, dispatch] = useReducer(reducer, initialFilter, (init) => {
    searchParams.forEach((value, key) => {
      init = { ...init, [key.replace('.', '_')]: value }
    })
    return init
  })

  useEffect(() => {
    setSearchParams(params.current, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--preview_text',
      `'${state.preview_text || preview_type['paragraph']}'`
    )
  }, [state.preview_text])

  useEffect(() => {
    const stylehseet = document.getElementById('customStyles').sheet
    stylehseet.insertRule(
      `.displayText::before {font-size: ${state.preview_size}px;}`,
      stylehseet.cssRules.length
    )
  }, [state.preview_size])

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useAppState = () => [
  useContext(StateContext),
  useContext(StateDispatchContext),
]

export default StateProvider

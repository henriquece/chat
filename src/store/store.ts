import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { ChatStoreInitialState } from '../types'

let globalState: ChatStoreInitialState | any = {}
let listeners: Dispatch<SetStateAction<{}>>[] = []
let actions = {}

const useStore = (shouldListen: boolean = true) => {
  const setState = useState(globalState)[1]

  const dispatch = (actionName: string, payload) => {
    const newState = actions[actionName](globalState, payload)
    globalState = { ...globalState, ...newState }

    listeners.forEach((listener) => listener(globalState))
  }

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState)
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState)
      }
    }
  }, [])

  return [globalState, dispatch] as const
}

const initStore = (storeActions, initialState?) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }
  }

  actions = { ...actions, ...storeActions }
}

export { useStore, initStore }

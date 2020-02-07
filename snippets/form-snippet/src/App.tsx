import * as React from 'react'
import * as R from 'ramda'
import { ThemeProvider } from "emotion-theming"
import { FormBuilder } from "./components/FormBuilder/FormBuilder"
import {AppStatus, FormStructure} from "./types"
import {graphqlClient} from "./graphql-client/client"
import {structureQuery} from "./graphql-client/queries"
import {EffectCallback} from "react"

const { useState, useEffect } = React

export const defaultStructure: FormStructure = {
  inputs: []
}

export const defaultTheme = {
  general: {
    background: '#fffff',
    border: '1px solid #cacaca',
    boxShadow: 'none'
  }
}



const fetchData = (setState: Function) : EffectCallback => (): void => {
  graphqlClient.query({ query:  structureQuery })
    .then((data) => {
      const structure = R.compose(
        R.pick(['inputs']), R.pathOr(defaultStructure, ['data', 'formSnippet', 'structure'])
      )(data)
      setState(R.mergeDeepLeft({
        structure,
        status: AppStatus.READY
      }))
    })
}

export const App = () => {
  const [appState, setState] = useState({
    structure: defaultStructure,
    theme: defaultTheme,
    status: AppStatus.LOADING
  })
  useEffect(fetchData(setState), [])

  return appState.status === AppStatus.READY && (
    <ThemeProvider theme={appState.theme}>
      <FormBuilder structure={appState.structure}/>
    </ThemeProvider>
  )
}
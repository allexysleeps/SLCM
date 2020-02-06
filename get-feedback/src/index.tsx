import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = (): any => <h1>HERE</h1>

const node = document.createElement('div')

ReactDOM.render(App(), node)

document.body.append(node)
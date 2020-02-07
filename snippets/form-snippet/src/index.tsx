import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from "./App"


const node = document.createElement('div')

ReactDOM.render(<App />, node)

document.body.append(node)
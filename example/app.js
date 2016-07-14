import React from 'react'
import DOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {reducer as uiReducer} from 'redux-ui'
import Dropdown from '../'

const store = createStore(
  combineReducers({ui: uiReducer}),
  window.devToolsExtension && window.devToolsExtension()
)

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Dropdown label='Sample'>
          Hello World
        </Dropdown>
      </Provider>
    )
  }
}

DOM.render(
  <App />,
  document.getElementById('app')
)

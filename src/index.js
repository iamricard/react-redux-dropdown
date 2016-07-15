import React from 'react'
import isEqual from 'lodash.isequal'
import ui from '@rcsole/redux-ui'

import * as styles from './styles'

const clickElementAt = ({x, y}) => {
  const element = document.elementFromPoint(x, y)

  if (element) {
    element.click()
    return true
  }
}

@ui({state: {isExpanded: false, eventQueue: []}})
class Dropdown extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    classNames: React.PropTypes.object
  }

  static defaultProps = {
    classNames: {}
  }

  shouldComponentUpdate (nextProps) {
    return !isEqual(nextProps.ui, this.props.ui)
  }

  componentDidUpdate () {
    if (!this.props.ui.eventQueue.length) return

    this.props.ui.eventQueue.forEach((evt) => evt.run(evt.param))
    this.props.updateUI({eventQueue: []})
  }

  handleTriggerClick () {
    this.props.updateUI('isExpanded', !this.props.ui.isExpanded)
  }

  handleOverlayClick (event) {
    this.props.updateUI('isExpanded', false)
    this.props.updateUI('eventQueue', [
      ...this.props.ui.eventQueue,
      {run: clickElementAt, param: {x: event.clientX, y: event.clientY}}
    ])
  }

  renderContent (isExpanded, content, classNames) {
    if (!isExpanded) return

    return (
      <div
        className={classNames.content}
        style={ui.isExpanded ? styles.content : {}}
      >
        {content}
      </div>
    )
  }

  renderOverlay (isExpanded, handleClick) {
    if (!isExpanded) return

    return (
      <div
        ref='overlay'
        style={styles.overlay}
        onClick={handleClick}
      ></div>
    )
  }

  render () {
    const {
      handleTriggerClick, handleOverlayClick,
      renderContent, renderOverlay,
      props: {ui, label, children, classNames}
    } = this

    return (
      <span>
        <div
          ref='trigger'
          style={ui.isExpanded ? styles.trigger : {}}
          className={classNames.trigger}
          onClick={this::handleTriggerClick}
        >
          {label}
        </div>

        {renderContent(ui.isExpanded, children, classNames)}

        {renderOverlay(ui.isExpanded, this::handleOverlayClick)}
      </span>
    )
  }
}

export default Dropdown

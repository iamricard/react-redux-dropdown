import React from 'react'
import ui from 'redux-ui'
import styles from './styles'

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

  renderContent (isExpanded, content) {
    if (!isExpanded) return

    return content
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
      <div>
        <div
          ref='trigger'
          className={classNames.trigger}
          style={styles.trigger}
          onClick={this::handleTriggerClick}
        >
          {label}
        </div>

        {renderContent(ui.isExpanded, children)}

        {renderOverlay(ui.isExpanded, this::handleOverlayClick)}
      </div>
    )
  }
}

export default Dropdown

import React from 'react'
import isEqual from 'lodash.isequal'
import ui from '@rcsole/redux-ui'

import * as styles from './styles'

@ui({state: {isExpanded: false}})
class Dropdown extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    classNames: React.PropTypes.object,
    onTriggerClick: React.PropTypes.func,
    forceUpdate: React.PropTypes.bool
  }

  static defaultProps = {
    classNames: {},
    forceUpdate: false
  }

  shouldComponentUpdate (nextProps) {
    return !isEqual(nextProps.ui, this.props.ui) || nextProps.forceUpdate
  }

  handleTriggerClick () {
    if (typeof this.props.triggerClick === 'function') {
      this.props.onTriggerClick()
    }

    this.props.updateUI('isExpanded', !this.props.ui.isExpanded)
  }

  handleOverlayClick (event) {
    this.props.updateUI('isExpanded', false)
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
      >
      </div>
    )
  }

  render () {
    const {
      handleTriggerClick, handleOverlayClick,
      renderContent, renderOverlay,
      props: {ui, label, children, classNames}
    } = this

    return (
      <div
        className={classNames.container}
        style={styles.container}
      >
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
      </div>
    )
  }
}

export default Dropdown

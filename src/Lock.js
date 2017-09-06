import React, { PropTypes, Component } from 'react';
import FocusTrap from './Trap';

class FocusLock extends Component {
  state = {
    observed: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.disabled && !this.props.disabled) {
      this.originalFocusedElement = null;
    }
  }

  componentWillUnmount() {
    if (
      this.props.returnFocus &&
      this.originalFocusedElement &&
      this.originalFocusedElement.focus
    ) {
      this.originalFocusedElement.focus();
    }
  }

  onActivation = () => {
    this.originalFocusedElement = this.originalFocusedElement || document.activeElement;
  };

  setObserveNode = observed =>
    this.setState({
      observed,
    });

  update =() =>
    this.setState(prevState => ({
      escapeAttempts: prevState.escapeAttempts + 1,
    }));

  originalFocusedElement = null;

  render() {
    const { children, disabled } = this.props;
    const { observed } = this.state;
    return (
      <div
        ref={this.setObserveNode}
        onBlur={this.onTrapBlur}
      >
        <FocusTrap
          observed={observed}
          disabled={disabled}
          onActivation={this.onActivation}
        >
          {children}
        </FocusTrap>
      </div>
    );
  }
}

FocusLock.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  returnFocus: PropTypes.bool,
};

FocusLock.defaultProps = {
  disabled: false,
  returnFocus: false,
  sandboxed: false,
};


export default FocusLock;

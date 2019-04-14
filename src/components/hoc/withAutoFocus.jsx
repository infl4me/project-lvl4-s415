import React from 'react';

export default (action = 'focus') => (Wrapped) => {
  class AutoFocusTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.textInput = React.createRef();
    }

    componentDidMount() {
      setTimeout(this.handleFocusTextInput, 0);
    }

    handleFocusTextInput = () => {
      this.textInput.current.focus();
      this.textInput.current[action]();
    };

    render() {
      return <Wrapped {...this.props} refLink={this.textInput} />;
    }
  }

  return AutoFocusTextInput;
};

import React from 'react';

export default action => (Wrapped) => {
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
      if (action) {
        this.textInput.current[action]();
      }
    };

    render() {
      return <Wrapped {...this.props} refLink={this.textInput} />;
    }
  }

  return AutoFocusTextInput;
};

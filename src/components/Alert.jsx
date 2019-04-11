import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class AlertDismissible extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    // const handleShow = () => this.setState({ show: true });
    return (
      <Alert show={this.state.show} variant="danger" className="fixed-top">
        <Alert.Heading>{'Something happened, can\'t send the message!'}</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={handleHide} variant="outline-danger">Close</Button>
        </div>
      </Alert>
    );
  }
}

export default AlertDismissible;

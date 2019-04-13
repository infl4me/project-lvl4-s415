import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({ error: { errorState, errorProps } }) => ({ errorState, errorProps });

const actionCreators = {
  removeAlert: actions.removeAlert,
};

@connect(mapStateToProps, actionCreators)
class AlertDismissible extends React.Component {
  handleClose = () => {
    const { removeAlert } = this.props;
    removeAlert();
  }

  render() {
    const { errorState, errorProps } = this.props;
    return (
      <Alert show={errorState !== 'none'} variant="danger" className="fixed-top">
        <Alert.Heading>{errorProps.message}</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={this.handleClose} variant="outline-danger">Close</Button>
        </div>
      </Alert>
    );
  }
}

export default AlertDismissible;

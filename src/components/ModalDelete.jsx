import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
};

@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  render() {
    const { name, handleClose } = this.props;
    return (
      <React.Fragment>
        <Modal.Header>{`Are you sure you want to delete '${name}' channel?`}</Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </React.Fragment>

    );
  }
}

export default ModalDeleteChannel;

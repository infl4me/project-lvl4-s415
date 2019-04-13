import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import { withAutoFocus, withModalHandler } from './hoc';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  return {
    channels: allIds.map(id => byId[id]),
  };
};

@connect(mapStateToProps)
@withAutoFocus('select')
@withModalHandler('newNameOfChannel', 'passChannelRename')
class ModalChannelRename extends React.Component {
  componentDidMount() {
    const { initialize, name } = this.props;
    initialize({ newNameOfChannel: name });
  }

  // uniq = (value) => {
  //   const { channels } = this.props;
  //   return channels.some(channel => channel.name === value) ? 'Already exists' : undefined;
  // };

  render() {
    const {
      name, handleClose, handleSubmit, refLink, submitting, pristine,
      renderFooter, handleConfirm, renderField, id,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(handleConfirm(id))}>
        <Modal.Header>{`Rename '${name}' channel`}</Modal.Header>
        <Modal.Body>
          <Field
            placeholder="Type new name"
            refLink={refLink}
            name="newNameOfChannel"
            component={renderField}
            type="text"
            required
          />
        </Modal.Body>
        {renderFooter(pristine, submitting, handleClose)}
      </Form>
    );
  }
}

export default ModalChannelRename;

import React from 'react';
import { Field } from 'redux-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withAutoFocus, withFormValidation, withModalHandler } from './hoc';

@withAutoFocus('select')
@withModalHandler('newNameOfChannel', 'passChannelRename')
@withFormValidation()
class ModalChannelRename extends React.Component {
  componentDidMount() {
    const { initialize, channel: { name } } = this.props;
    initialize({ newNameOfChannel: name });
  }

  render() {
    const {
      channel, handleClose, handleSubmit, refLink, submitting, pristine,
      renderFooter, handleConfirm, renderField,
      uniq, requiredField,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(handleConfirm(channel.id))}>
        <DialogTitle>{`Rename '${channel.name}' channel`}</DialogTitle>
        <DialogContent>
          <Field
            refLink={refLink}
            label="Channel new name"
            name="newNameOfChannel"
            component={renderField}
            type="text"
            validate={[uniq, requiredField]}
          />
        </DialogContent>
        {renderFooter(pristine, submitting, handleClose)}
      </form>
    );
  }
}

export default ModalChannelRename;

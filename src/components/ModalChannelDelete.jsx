import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withModalHandler } from './hoc';

@withModalHandler('channelDelete', 'passChannelDelete')
class ModalChannelDelete extends React.Component {
  render() {
    const {
      channel, handleClose, handleSubmit, submitting,
      renderFooter, handleConfirm,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(handleConfirm(channel.id))}>
        <DialogTitle>{`Are you sure you want to delete '${channel.name}' channel?`}</DialogTitle>
        {renderFooter(false, submitting, handleClose)}
      </form>
    );
  }
}

export default ModalChannelDelete;

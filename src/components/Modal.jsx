import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import connect from '../connect';

const mapStateToProps = ({ modal: { modalState, modalProps } }) => ({ modalState, modalProps });

@connect(mapStateToProps)
class FormDialogCustom extends React.Component {
  handleClose = () => {
    const { removeModal } = this.props;
    removeModal();
  };

  render() {
    const {
      modalState,
      modalProps: {
        renderModalBody,
      },
    } = this.props;
    const hasModal = modalState !== 'none';
    if (!hasModal) {
      return null;
    }
    return (
      <div>
        <Dialog
          open={hasModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {renderModalBody(this.handleClose)}
        </Dialog>
      </div>
    );
  }
}

export default FormDialogCustom;

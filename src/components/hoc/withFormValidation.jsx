/* eslint-disable consistent-return */
// If the value is valid, the validation function should return undefined.
import React from 'react';
import { channelsSelector } from '../../selectors';
import connect from '../../connect';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
});

export default () => (Wrapped) => {
  @connect(mapStateToProps)
  class WithFormValidation extends React.Component {
  uniq = (value) => {
    const { channels, name } = this.props;
    const isUniq = !(channels.filter(ch => ch.name !== name).some(ch => ch.name === value));
    if (!isUniq) {
      return 'Channel name already exists';
    }
  };

  requiredField = (value) => {
    if (!value || !value.trim()) {
      return 'Required';
    }
  };

  render() {
    return (
      <Wrapped
        {...this.props}
        uniq={this.uniq}
        requiredField={this.requiredField}
      />
    );
  }
  }

  return WithFormValidation;
};

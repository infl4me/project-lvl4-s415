import React from 'react';
import { connect } from 'react-redux';
import { channelsSelector } from '../../selectors';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
});

export default () => (Wrapped) => {
  @connect(mapStateToProps)
  class WithFormValidation extends React.Component {
  // If the value is valid, the validation function should return undefined.
  // eslint-disable-next-line consistent-return
  uniq = (value) => {
    const { channels, name } = this.props;
    const isUniq = !(channels.filter(ch => ch.name !== name).some(ch => ch.name === value));
    if (!isUniq) {
      return 'Channel name already exists';
    }
  };

  requiredField = value => (value ? undefined : 'Required');

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

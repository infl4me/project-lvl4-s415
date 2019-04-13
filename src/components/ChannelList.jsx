import React from 'react';
import { connect } from 'react-redux';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelListItem from './ChannelListItem';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  return {
    channels: allIds.map(id => byId[id]),
  };
};

@connect(mapStateToProps)
class ChannelList extends React.Component {
  render() {
    const { channels } = this.props;
    const items = channels.map(channel => <ChannelListItem {...channel} key={channel.id} />);
    return (
      <React.Fragment>
        <ChannelsListHeader />
        <div>{items}</div>
      </React.Fragment>
    );
  }
}
export default ChannelList;

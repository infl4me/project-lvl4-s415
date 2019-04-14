import React from 'react';
import { connect } from 'react-redux';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelListItem from './ChannelListItem';
import { channelsSelector } from '../selectors';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
});

@connect(mapStateToProps)
class ChannelList extends React.Component {
  render() {
    const { channels } = this.props;
    const items = channels.map(channel => <ChannelListItem {...channel} key={channel.id} />);
    return (
      <React.Fragment>
        <ChannelsListHeader />
        <div className="pl-3 pr-3">{items}</div>
      </React.Fragment>
    );
  }
}
export default ChannelList;

import React from 'react';
import { withUserName } from './hoc';

@withUserName()
class UserBlock extends React.Component {
  render() {
    const { username } = this.props;
    const styless = {
      backgroundColor: '#242a32',
    };
    return (
      <div style={styless} className="m-3 mb-5 pl-2 rounded">{username}</div>
    );
  }
}

export default UserBlock;

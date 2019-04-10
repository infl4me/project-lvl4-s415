import React from 'react';
import { withUserName } from './hoc';

@withUserName()
class UserBlock extends React.Component {
  render() {
    const { username } = this.props;
    const styles = {
      backgroundColor: '#23272b',
    };
    return (
      <div style={styles} className="m-3 mb-5 pl-2 rounded">{username}</div>
    );
  }
}

export default UserBlock;

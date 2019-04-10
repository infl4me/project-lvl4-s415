import React from 'react';
import { UserNameConsumer } from '../userNameContext';

const withUserName = () => Wrapped => props => (
  <UserNameConsumer>
    {
      function Consumer(username) {
        return <Wrapped {...props} username={username} />;
      }
    }
  </UserNameConsumer>
);

export default withUserName;

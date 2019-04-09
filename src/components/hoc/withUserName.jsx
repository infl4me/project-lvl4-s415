import React from 'react';
import { UserNameConsumer } from '../userNameContext';

const withGon = () => Wrapped => props => (
  <UserNameConsumer>
    {
      function Consumer(username) {
        return <Wrapped {...props} username={username} />;
      }
    }
  </UserNameConsumer>
);

export default withGon;

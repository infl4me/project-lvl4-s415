import React from 'react';
import { GonConsumer } from './gonContext';

const withGon = Wrapped => props => (
  <GonConsumer>
    {
      function Consumer(gon) { return (<Wrapped {...props} channels={gon.channels} />); }
    }
  </GonConsumer>
);

export default withGon;

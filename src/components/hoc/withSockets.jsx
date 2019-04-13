import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const events = [
  {
    name: 'newChannel',
    cb: ({ addChannel }) => ({ data }) => {
      const channel = data.attributes;
      console.log(channel, 'SOCKET_CHANNEL_ADD');
      addChannel({ channel });
    },
  },
  {
    name: 'removeChannel',
    cb: ({ removeChannel }) => ({ data }) => {
      const { id } = data;
      console.log(id, 'SOCKET_CHANNEL_DELETE');
      removeChannel({ id });
    },
  },
  {
    name: 'newMessage',
    cb: ({ addMessage }) => ({ data }) => {
      const message = data.attributes;
      console.log(message, 'SOCKET_MESSAGE_ADD');
      addMessage({ message });
    },
  },
  {
    name: 'renameChannel',
    cb: ({ renameChannel }) => ({ data }) => {
      const channel = data.attributes;
      console.log(channel, 'SOCKET_CHANNEL_RENAME');
      renameChannel({ channel });
    },
  },
];


export default () => (Wrapped) => {
  const mapStateToProps = () => ({});

  @connect(mapStateToProps, actions)
  class WithSocket extends React.Component {
    componentDidMount() {
      const socket = io();
      const { addError } = this.props;
      events.forEach(({ name, cb }) => {
        socket.on(name, cb(this.props));
      });

      socket.on('error', () => {
        console.log('SOCKET_ERR');
        addError({ errMessage: 'err' });
      });

      socket.on('connect_error', () => {
        console.log('SOCKET_CONNECT_ERR');
        addError({ errMessage: 'connect_error' });
      });
    }

    render() {
      const { children } = this.props;
      return <Wrapped {...this.props}>{children}</Wrapped>;
    }
  }

  return WithSocket;
};

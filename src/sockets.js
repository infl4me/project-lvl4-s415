import io from 'socket.io-client';

const socket = io();

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

export default (actions) => {
  const { showAlert } = actions;
  events.forEach(({ name, cb }) => {
    socket.on(name, cb(actions));
  });

  socket.on('error', () => {
    console.log('SOCKET_ERR');
    showAlert({ errorProps: { message: 'Connection has been lost' } });
  });

  socket.on('connect_error', () => {
    console.log('SOCKET_CONNECT_ERR');
    showAlert({ errorProps: { message: 'Connection has been lost' } });
  });
};

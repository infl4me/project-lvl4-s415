import axios from 'axios';
import { createAction } from 'redux-actions';
import gon from 'gon';
import routes from '../routes';

export const addData = createAction('DATA_ADD');

export const fetchData = () => (dispatch) => {
  dispatch(addData(gon));
};

export const toggleDrawer = createAction('DRAWER_TOGGLE');

export const addMessage = createAction('MESSAGE_ADD');


export const changeChannel = createAction('CHANNEL_CHANGE');
export const addChannel = createAction('CHANNEL_ADD');
export const renameChannel = createAction('CHANNEL_RENAME');
export const removeChannel = createAction('CHANNEL_REMOVE');


export const showModal = createAction('MODAL_SHOW');
export const removeModal = createAction('MODAL_REMOVE');


export const showAlert = createAction('ALERT_SHOW_ERR');
export const removeAlert = createAction('ALERT_REMOVE');


export const sendMessage = (channelId, attributes) => async () => {
  const url = routes.channelMessages(channelId);
  await axios.post(url, { data: { attributes } });
};


export const passNewChannel = name => async () => {
  const url = routes.channels();
  await axios.post(url, { data: { attributes: { name } } });
};


export const passChannelRename = (id, name) => async () => {
  const url = routes.channel(id);
  await axios.patch(url, { data: { attributes: { name } } });
};


export const passChannelDelete = id => async () => {
  const url = routes.channel(id);
  await axios.delete(url);
};

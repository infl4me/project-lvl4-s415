import axios from 'axios';
import { createAction } from 'redux-actions';

const apiBase = '/api/v1';


export const fetchData = createAction('DATA_FETCH');


export const addMessage = createAction('MESSAGE_ADD');


export const changeChannel = createAction('CHANNEL_CHANGE');
export const addChannel = createAction('CHANNEL_ADD');
export const renameChannel = createAction('CHANNEL_RENAME');
export const removeChannel = createAction('CHANNEL_REMOVE');


export const showModal = createAction('MODAL_SHOW');
export const removeModal = createAction('MODAL_REMOVE');


export const showAlert = createAction('ALERT_SHOW_ERR');
export const removeAlert = createAction('ALERT_REMOVE');


export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = (channelId, attributes) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = `${apiBase}/channels/${channelId}/messages`;
    await axios.post(url, { data: { attributes } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};


export const passNewChannelRequest = createAction('NEWCHANNEL_PASS_REQUEST');
export const passNewChannelSuccess = createAction('NEWCHANNEL_PASS_SUCCESS');
export const passNewChannelFailure = createAction('NEWCHANNEL_PASS_FAILURE');

export const passNewChannel = name => async (dispatch) => {
  dispatch(passNewChannelRequest());
  try {
    const url = `${apiBase}/channels`;
    await axios.post(url, { data: { attributes: { name } } });
    dispatch(passNewChannelSuccess());
  } catch (e) {
    dispatch(passNewChannelFailure());
    throw e;
  }
};

export const passChannelRenameRequest = createAction('CHANNEL_RENAME_REQUEST');
export const passChannelRenameSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const passChannelRenameFailure = createAction('CHANNEL_RENAME_FAILURE');

export const passChannelRename = (id, name) => async (dispatch) => {
  dispatch(passChannelRenameRequest());
  try {
    const url = `${apiBase}/channels/${id}`;
    await axios.patch(url, { data: { attributes: { name } } });
    dispatch(passChannelRenameSuccess());
  } catch (e) {
    dispatch(passChannelRenameFailure());
    throw e;
  }
};

export const passChannelDeleteRequest = createAction('CHANNEL_DELETE_REQUEST');
export const passChannelDeleteSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const passChannelDeleteFailure = createAction('CHANNEL_DELETE_FAILURE');

export const passChannelDelete = id => async (dispatch) => {
  dispatch(passChannelDeleteRequest());
  try {
    const url = `${apiBase}/channels/${id}`;
    await axios.delete(url);
    dispatch(passChannelDeleteSuccess());
  } catch (e) {
    dispatch(passChannelDeleteFailure());
    throw e;
  }
};

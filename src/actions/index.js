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


export const addError = createAction('ERROR_ADD');


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

export const passChannelNewNameRequest = createAction('CHANNEL_NEWNAME_REQUEST');
export const passChannelNewNameSuccess = createAction('CHANNEL_NEWNAME_SUCCESS');
export const passChannelNewNameFailure = createAction('CHANNEL_NEWNAME_FAILURE');

export const passChannelNewName = (id, name) => async (dispatch) => {
  dispatch(passChannelNewNameRequest());
  try {
    const url = `${apiBase}/channels/${id}`;
    await axios.patch(url, { data: { attributes: { name } } });
    dispatch(passChannelNewNameSuccess());
  } catch (e) {
    dispatch(passChannelNewNameFailure());
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

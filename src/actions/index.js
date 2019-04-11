import axios from 'axios';
import { createAction } from 'redux-actions';

export const fetchData = createAction('DATA_FETCH');

export const addMessage = createAction('MESSAGE_ADD');

export const changeChannel = createAction('CHANNEL_CHANGE');


export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = (channelId, attributes) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = `/api/v1/channels/${channelId}/messages`;
    await axios.post(url, { data: { attributes } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};

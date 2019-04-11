import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const transformToStateShape = coll => coll.reduce((state, item) => ({
  byId: { ...state.byId, [item.id]: item },
  allIds: [...state.allIds, item.id],
}), { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.fetchData](state, { payload }) {
    return {
      ...transformToStateShape(payload.channels),
      currentChannelId: payload.currentChannelId,
    };
  },
  [actions.changeChannel](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, { byId: {}, allIds: [], currentChannelId: 1 });

const messages = handleActions({
  [actions.fetchData](state, { payload }) {
    return transformToStateShape(payload.messages);
  },
  [actions.addMessage](state, { payload: { message } }) {
    return {
      ...state,
      byId: { ...state.byId, [message.id]: message },
      allIds: [...state.allIds, message.id],
    };
  },
}, { byId: {}, allIds: [] });

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    console.log('sendMessageRequest');
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    console.log('sendMessageFailure');
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
    console.log('sendMessageSuccess');
    return 'finished';
  },
}, 'none');

const error = handleActions({
  [actions.addError](state, { payload: { errMessage } }) {
    return errMessage;
  },
}, null);

export default combineReducers({
  channels,
  messages,
  messageSendingState,
  error,
  form: formReducer,
});

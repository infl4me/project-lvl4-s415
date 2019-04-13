import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const transformToStateShape = coll => coll.reduce((state, item) => ({
  byId: { ...state.byId, [item.id]: item },
  allIds: [...state.allIds, item.id],
}), { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.fetchData](state, { payload }) {
    return {
      ...state,
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
  [actions.addChannel](state, { payload: { channel } }) {
    return {
      ...state,
      byId: { ...state.byId, [channel.id]: channel },
      allIds: [...state.allIds, channel.id],
    };
  },
  [actions.removeChannel](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: 1,
      byId: _.omit(state.byId, id),
      allIds: state.allIds.filter(chId => chId !== id),
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
  [actions.removeChannel](state, { payload: { id } }) {
    const newById = _.omitBy(state.byId, chId => chId !== id);
    return {
      ...state,
      byId: newById,
      allIds: state.allIds.filter(msgId => newById[msgId]),
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

const newChannelPassingState = handleActions({
  [actions.passNewChannelRequest]() {
    console.log('passNewChannelRequest');
    return 'requested';
  },
  [actions.passNewChannelFailure]() {
    console.log('passNewChannelFailure');
    return 'failed';
  },
  [actions.passNewChannelSuccess]() {
    console.log('passNewChannelSuccess');
    return 'finished';
  },
}, 'none');

const channelNewNamePassingState = handleActions({
  [actions.passChannelNewNameRequest]() {
    console.log('passChannelNewNameRequest');
    return 'requested';
  },
  [actions.passChannelNewNameFailure]() {
    console.log('passChannelNewNameFailure');
    return 'failed';
  },
  [actions.passChannelNewNameSuccess]() {
    console.log('passChannelNewNameSuccess');
    return 'finished';
  },
}, 'none');

const channelDeletePassingState = handleActions({
  [actions.passChannelDeleteRequest]() {
    console.log('passChannelDeleteRequest');
    return 'requested';
  },
  [actions.passChannelDeleteFailure]() {
    console.log('passChannelDeleteFailure');
    return 'failed';
  },
  [actions.passChannelDeleteSuccess]() {
    console.log('passChannelDeleteSuccess');
    return 'finished';
  },
}, 'none');

const modal = handleActions({
  [actions.showModal](state, { payload: { modalState, modalProps } }) {
    return {
      modalState,
      modalProps,
    };
  },
  [actions.removeModal]() {
    return {
      modalState: 'none',
      modalProps: {},
    };
  },
}, { modalState: 'none', modalProps: {} });

const error = handleActions({
  [actions.addError](state, { payload: { errMessage } }) {
    return errMessage;
  },
}, null);

export default combineReducers({
  channels,
  messages,
  messageSendingState,
  newChannelPassingState,
  channelNewNamePassingState,
  channelDeletePassingState,
  error,
  modal,
  form: formReducer,
});

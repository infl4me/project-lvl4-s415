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
  [actions.addData](state, { payload }) {
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
  [actions.renameChannel](state, { payload: { channel } }) {
    return {
      ...state,
      byId: { ...state.byId, [channel.id]: channel },
    };
  },
}, { byId: {}, allIds: [], currentChannelId: 1 });

const messages = handleActions({
  [actions.addData](state, { payload }) {
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
    const newById = _.omitBy(state.byId, msg => msg.channelId === id);
    return {
      ...state,
      byId: newById,
      allIds: state.allIds.filter(msgId => newById[msgId]),
    };
  },
}, { byId: {}, allIds: [] });

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
  [actions.showAlert](state, { payload: { errorState, errorProps } }) {
    return {
      errorState,
      errorProps,
    };
  },
  [actions.removeAlert]() {
    return {
      errorState: 'none',
      errorProps: {},
    };
  },
}, { errorState: 'none', errorProps: {} });

const drawerShown = handleActions({
  [actions.toggleDrawer](state) {
    return !state;
  },
}, false);

export default combineReducers({
  channels,
  messages,
  error,
  modal,
  drawerShown,
  form: formReducer,
});

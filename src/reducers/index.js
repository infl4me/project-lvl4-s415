import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import gon from 'gon';
import * as actions from '../actions';

const { currentChannelId, messages } = gon;

const channelsUIState = handleActions({
  [actions.changeChannel](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, { currentChannelId, messages });

export default combineReducers({
  channelsUIState,
  form: formReducer,
});

import { createSelector } from 'reselect';

const getChannelsById = state => state.channels.byId;
const getChannelsIds = state => state.channels.allIds;
const getChannelsCurrentId = state => state.channels.currentChannelId;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

const getMessagesById = state => state.messages.byId;
const getMessagesIds = state => state.messages.allIds;

export const messagesSelector = createSelector(
  [getMessagesById, getMessagesIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const filteredMessagesSelector = createSelector(
  [getChannelsCurrentId, messagesSelector],
  (currentChannelId, messages) => messages.filter(msg => msg.channelId === currentChannelId),
);

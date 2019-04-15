const apiBase = '/api/v1';


export default {
  channelMessages: channelId => `${apiBase}/channels/${channelId}/messages`,
  channels: () => `${apiBase}/channels`,
  channel: id => `${apiBase}/channels/${id}`,
};

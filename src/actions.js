const NEW_MESSAGE = "NEW_MESSAGE";

function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message
  };
}

const ALL_MESSAGES = "ALL_MESSAGES";

function allMessage(messages) {
  return {
    type: ALL_MESSAGES,
    payload: messages
  };
}

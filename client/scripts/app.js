let app = {
  init: function() {    
    app.server = 'http://parse.sfm8.hackreactor.com';    
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    $('#chats').append(`<div>${message}</div>`);    
  },
  renderRoom: function(room) {
    $('#roomSelect').append(`<option value="${room}">${room}</option>`);
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    var data, success, dataType;
    $.ajax({
      url: app.server,
      data: data,
      success: success,
      dataType: dataType
    });
  }
};

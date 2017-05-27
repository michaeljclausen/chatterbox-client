class App {
  constructor() {
    this.init();
  }
  init() { 
    this.fetch();
  }
  clearMessages() {
    $('#chats').empty();
  }
  renderMessage(message) {
    //console.log(message);
    $('#chats').append(`<div class='username'>${message.username}:</div>`);
    $('#chats').append(`<div class='text'>${message.text}</div>`);
  }
  renderRoom(room) {
    this.clearMessages();
    this.fetch();
  }
  sendMessage(username, roomname, text) {
    //console.log(`${username}, ${roomname}, ${text} `);
    let message = {
      username: username,
      text: text,
      roomname: roomname
    };
    console.log(message);
    this.send(message);
    this.renderRoom();
  }
  send(message) {
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
  }
  fetch() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: this.messages,
      contentType: 'application/json',
      success: function (data) {
        let messages = data.results;
        let rooms = {};
        let selectedRoom = $('#roomSelect').find(':selected').text();
        if (!selectedRoom) {
          messages.forEach(message => {
            if (message.hasOwnProperty('roomname')) {
              rooms[message['roomname']] = 1;
            }
          });
          
          for (let room in rooms) {
            $('#roomSelect').append($('<option>', {
              value: room,
              text: room
            }));
          }
        }
        
        
        //console.log(selectedRoom);
        
        messages.forEach(message => {
          if (message.roomname === selectedRoom) {
            this.renderMessage(message); 
          } 
        });
      }.bind(this),
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }
}

let app = new App();

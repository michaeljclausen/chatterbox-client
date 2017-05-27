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
    let cleanedUser = this.escapeString(message.username);
    let cleanedText = this.escapeString(message.text);
    $('#chats').append(`<div class='username'>${cleanedUser}:</div>`);
    $('#chats').append(`<div class='text'>${cleanedText}</div>`);
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
      data: { limit: 100, order: '-createdAt' },
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        //data = this.escapeString(data);
        let messages = data.results;
        let rooms = {};
        let selectedRoom = $('#roomSelect').find(':selected').text();
        if (!selectedRoom) {
          messages.forEach(message => {
            if (message.hasOwnProperty('roomname')) {
              // sets unique roomname as key on rooms object
              rooms[message['roomname']] = 1;
            }
          });
          
          for (let room in rooms) {
            let cleanedRoom = this.escapeString(room);
            $('#roomSelect').append($('<option>', {
              value: cleanedRoom,
              text: cleanedRoom
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
  escapeString(stringToCheck) {
    console.log(stringToCheck); 
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (SCRIPT_REGEX.test(stringToCheck)) {
      stringToCheck = stringToCheck.replace(SCRIPT_REGEX, '');
    }
    console.log(stringToCheck);
    return stringToCheck;    
  }
}

let app = new App();

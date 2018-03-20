var chatDisplay = document.getElementById('chatDisplay')
var sendButton = document.getElementById('sendButton')
var chatInput = document.getElementById('chatInput')

window.WebSocket = window.WebSocket || window.MozWebSocket

var connection = new WebSocket('ws://localhost:8000/ws')

connection.onopen = function () {
    chatDisplay.style.border = 2
    chatDisplay.style.borderColor = 'green'
}

connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    chatDisplay.style.border = 2
    chatDisplay.style.borderColor = 'red'
};

connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    var json
    try {
        json = JSON.parse(message.data).content
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return
    }
    chatDisplay.innerHTML += json
}

sendButton.onclick = function (params) {
    var wrapper = {
        content: chatInput.value
    }
    connection.send(JSON.stringify(wrapper))
    chatInput.value = ''
}
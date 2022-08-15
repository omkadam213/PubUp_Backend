var io = io()

var reciever = "";
var sender = "";

function enterName() {

    //Get username
    var name = document.getElementById('name').value
        // Send it to server
    io.emit('user_connected', name);
    // save my name in global variable
    sender = name;
    //Prevent the form from submitting
    return false
}

//listen from server

io.on("user_connected", function(username) {
    var html = "";
    html += "<li><button onclick='onUserSelected(this.innerHTML)'>" + username + "</button></li>"

    document.getElementById("users").innerHTML += html

})

function onUserSelected(username) {
    // save selected user in global variable
    reciever = username
}

function sendMessage() {
    //get message
    var message = document.getElementById('message').value;

    // send msg to server
    io.emit("send_message", {
        sender: sender,
        reciever: reciever,
        message: message
    })

    var html = ""
    html += "<li> you said:" + message + "</li>"


    document.getElementById("messages").innerHTML += html

    //prevent form from submitting
    return false;
}

//listen from server
io.on("new_message", function(data) {
    var html = ""
    html += "<li>" + data.sender + "says:" + data.message + "</li>"

    document.getElementById("messages").innerHTML += html



})
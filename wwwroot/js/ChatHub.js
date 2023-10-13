"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendMessageBtn").disabled = true;



connection.on("ReceiveMessage", function (user, message) {
    
    var usercurrentContext = document.getElementById("usernamelabel").value;
    var mainConatiner = document.getElementById("mainContainer");
    var pElement = document.createElement('p');
    var spanElement = document.createElement('span');
    var divContainerElement = document.createElement("div");
    var chatBoxdivElement = document.createElement("div");

    if (usercurrentContext == user) {
        // code for current user

        spanElement.className = "time-right";
        spanElement.setAttribute('id', 'recieveTime');
        spanElement.innerHTML = new Date().toLocaleString();;

        pElement.innerHTML = user+": "+message;
        pElement.setAttribute('id', 'userMessage');

        divContainerElement.className = "container";
        chatBoxdivElement.className = "chatsBox right  mb-2";

        divContainerElement.appendChild(pElement);
        divContainerElement.appendChild(spanElement);
        chatBoxdivElement.appendChild(divContainerElement);
        mainConatiner.appendChild(chatBoxdivElement); 
    }
    else {
        // code for another user sends message 
       
        spanElement.className = "time-left";
        spanElement.setAttribute('id', 'recieveTime');
        spanElement.innerHTML = new Date().toLocaleString();;

        pElement.innerHTML = user + ": " + message;;
        pElement.setAttribute('id', 'userMessage');

        divContainerElement.className = "container";
        chatBoxdivElement.className = "chatsBox left  mb-2";

        divContainerElement.appendChild(pElement);
        divContainerElement.appendChild(spanElement);
        chatBoxdivElement.appendChild(divContainerElement);
        mainConatiner.appendChild(chatBoxdivElement); 
    }

    
    
});


// start connection for hubhub 
connection.start().then(function () {
    document.getElementById("sendMessageBtn").disabled = false;
    console.log("connection started");
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("sendMessageBtn").addEventListener("click", function (event) {
    
    var user = document.getElementById("usernamelabel").value;
    var messageControl = document.getElementById("messageTextBox");
    var message = messageControl.value;
    messageControl.value = null;
    
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    })

}); 








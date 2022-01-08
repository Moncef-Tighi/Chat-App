import { format } from 'https://esm.run/date-fns'

const socket= io();

const formMessage = document.querySelector("#message-form");
const formConnexion = document.querySelector("#connexion");
const wrapper=document.querySelector("#wrapper");
const connectedList= document.querySelector("aside").querySelector("ul");
let username;

const chat = document.querySelector("section");


socket.on('updateMessages', (message)=> {
    const messageHTML = `
        <div class="message">
            <p>${message}</p>
            <span class="time-left">${format(new Date(), 'MMM eo k:mm')}</span>
        </div>
    `
    chat.insertAdjacentHTML("beforeend", messageHTML)
})

socket.on("updateList", (usersList)=> {
    console.log(usersList);
    connectedList.innerHTML="";
    usersList.forEach(user => {
        connectedList.insertAdjacentHTML("beforeend", `<li>${user}</li>`)        
    });
})

formMessage.addEventListener("submit", (event)=> {
    event.preventDefault()
    const message = document.querySelector("#sender").value;
    document.querySelector("#sender").value="";
    document.querySelector("#sender").focus();
    if (message){
        socket.emit('sendMessage', message)
    }

})

formConnexion.addEventListener("submit", (event)=> {
    event.preventDefault()
    username=  document.querySelector("#username").value;
    if (username){
        wrapper.style.display="none";
        socket.emit('connexion', username)
        document.querySelector("#name").innerHTML=username;
    }
})
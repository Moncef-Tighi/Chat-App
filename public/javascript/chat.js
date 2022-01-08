import { format } from 'https://esm.run/date-fns'

const socket= io();

const formMessage = document.querySelector("#message-form");
const formConnexion = document.querySelector("#connexion");
const wrapper=document.querySelector("#wrapper");
const connectedList= document.querySelector("aside").querySelector("ul");
const deco= document.querySelector("#déconnexion");
let username;

const chat = document.querySelector("section");


socket.on('updateMessages', (message, sender)=> {
    const messageHTML = `
        <div class="message">
            <h1>${sender}</h1> <span class="time-left">${format(new Date(), 'MMM eo k:mm')}</span>
            <p>${message}</p>
        </div>
    `
    chat.insertAdjacentHTML("beforeend", messageHTML)
})

socket.on("updateList", (usersList)=> {
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
        socket.emit('sendMessage', message, username)
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
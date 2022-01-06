
const socket= io();
const form = document.querySelector("form")
const chat = document.querySelector("section")
import { format } from 'https://esm.run/date-fns'

socket.on('updateMessages', (message)=> {
    const messageHTML = `
        <div class="message">
            <p>${message}</p>
            <span class="time-left">${format(new Date(), 'MMM eo k:mm')}</span>
        </div>
    `
    chat.insertAdjacentHTML("beforeend", messageHTML)
})

form.addEventListener("submit", (event)=> {
    event.preventDefault()
    const message = document.querySelector("input").value;
    document.querySelector("input").value="";
    document.querySelector("input").focus();
    if (message){
        socket.emit('sendMessage', message)
    }

})

const socket= io();
const form = document.querySelector("form")
const chat = document.querySelector("section")

socket.on('welcome', (data) => {
    console.log(data);
})

socket.on('updateMessages', (message)=> {
    const messageHTML = `
        <div class="message">
            <p>${message}</p>
            <span class="time-left">11:00</span>
        </div>
    `
    chat.insertAdjacentHTML("beforeend", messageHTML)
})

form.addEventListener("submit", (event)=> {
    event.preventDefault()
    message = document.querySelector("input").value;
    document.querySelector("input").value=""
    if (message){
        socket.emit('sendMessage', message)
    }

})
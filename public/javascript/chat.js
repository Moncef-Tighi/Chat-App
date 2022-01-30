import { format } from 'https://esm.run/date-fns'

const socket= io();

const formMessage = document.querySelector("#message-form");
const formConnexion = document.querySelector("#connexion");
const wrapper=document.querySelector("#wrapper");
const connectedList= document.querySelector("aside").querySelector("ul");
const section = document.querySelector("section");


let username;

const chat = document.querySelector("section");


socket.on('updateMessages', (message, sender, mine)=> {
    const messageHTML = `
        <div class="${mine}message">
            <h1>${sender}</h1> <span class="time">${format(new Date(), 'MMM eo k:mm')}</span>
            <p>${message}</p>
        </div>
    `
    chat.insertAdjacentHTML("beforeend", messageHTML);
    window.scrollTo(0,section.scrollHeight);
})

socket.on("updateList", (usersList)=> {
    connectedList.innerHTML="";
    usersList.forEach(user => {
        connectedList.insertAdjacentHTML("beforeend", `<li>${user}</li>`)        
    });
})




/*
    Gestion des commandes :
*/


const help= {
    "/help" : "liste des commandes existantes",
    "/why" : "Objectif du projet",
    "/github" : "Lien vers la page GitHub du projet",
    "/contact" : "Comment me contacter",
    "/message" : "Envoie un message aléatoire"
}

const messageTemplate=function(string) {
    return `        
    <div class="message">
        <p>${string}</p>
    </div>
    `
}
const commandes = {
    "/help" : function() {
        let output=''
        for (const [key, value] of Object.entries(help)) output+=`<b>${key}</b> : ${value}<br>`
        return messageTemplate(output);
    },
    "/why" : function() {
        return messageTemplate(`Ce projet vise principalement à mettre en pratique ce que j'ai apprit 
        En matière de webSocket. Son utilisation est plus difficile à montrer que mes autres projets, mais
        son utilisation reste relativement évidente.`);
    },
    "/github" : function() {
        return messageTemplate(`Vous pouvez voir le code
        <a href="https://github.com/Moncef-Tighi/Chat-App" style="color: red"> ici </a>`)
    },
    "/contact" : function() {
        return messageTemplate(`
        <p><b>Numéro de téléphone : </b> 0667536033</p>
        <p><b>Adresse email : </b> monceftighiouart@gmail.com </p>`);
    },
    "/message" : function() {
        const messages = [
            'The only difference between a problem and a solution is that people understand the solution. - Charles F. Kettering, 1876 - 1958',
            'He who least needs tomorrow, will most gladly greet tomorrow. - Epicurus',
            'If you do not change direction, you might end up where you are heading. - Lao Tzu',
            'Over-sentimentality, over-softness, in fact washiness and mushiness are the great dangers of this age and of this people. Unless we keep the barbarian virtues, gaining the civilized ones will be of little avail. - Theodore Roosevelt',
            'The truth is that the dreams that you have are very different from the actions that will get you there. - James Clear'];
        const index = Math.round(Math.random()*messages.length);
        return messageTemplate(messages[index]);
    }
}

// ----------

formMessage.addEventListener("submit", (event)=> {
    event.preventDefault()
    const message = document.querySelector("#sender").value;
    document.querySelector("#sender").value="";
    document.querySelector("#sender").focus();
    if (message in commandes) {
        chat.insertAdjacentHTML("beforeend", commandes[message]());
    } else if (message){
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
        document.querySelector("#Introduction").innerText=`Bienvenue ${username}. Tapez /help pour une liste des commandes disponibles`
    }
})
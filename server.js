const express = require("express");

const server= express();

const port = 3000
server.listen(port, ()=> {
    console.log(`Server open on port ${port}`);
});

server.use(express.static("./public"));

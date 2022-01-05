const server = require("./main");
const dotenv= require('dotenv')
dotenv.config({path:__dirname+'/config.env'});


const port = process.env.PORT || 2000
server.listen(port, ()=> {
    console.log(`Server open on port ${port}`);
});

const index = require("../views/index.html")


const render = function(request, response) {
    response.status(200).render(index);
}


module.exports= {
    render
}
const http = require("http");

const server = http.createServer((req, res) => {
 
    if(req.url == "/"){
        res.end("home page")
    }
    if(req.url == "/profile"){
        res.end("profile")
    }
    if(req.url == "/about"){
        res.end("about")
    }
});

server.listen(3000);

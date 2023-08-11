const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = 3636;

// fs.readFile("./index.html", (err, data) => {
//     if (err) {
//       console.log("Error exporting html file");
//     }else{
//           const htmlContent = data.toString()
//           console.log(htmlContent)
//     } 
//   });

const exportHTML = fs.readFileSync('./index.html',"utf-8")


const requestHandler = function (req, res) {
  console.log(req.url);

  switch (req.url) {
    case "/index.html":
      res.writeHead(200);
      res.end(exportHTML);
      break;
    default:
      res.writeHead(404);
      res.end("Page not found");
  }
};




const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log("Server is running ");
});

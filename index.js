const express = require("express");

const app = express();
const port = 8080;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`서버가 실행됩니다. url: http://localhost:${port}`)
})
import express from "express"

const app = express();

app.use(express.static("public"));

app.listen(8080, () => {
    console.log(`서버가 실행됩니다. url: http://localhost:8080}`)
})

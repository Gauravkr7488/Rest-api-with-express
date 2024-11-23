const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`)
)

app.get("/users/api", (req, res) => {
    return res.json(users);
})

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})

app.get("/users/api/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

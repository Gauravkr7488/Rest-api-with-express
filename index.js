const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

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

app.post("/users/api", (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {

        return res.json({ status: "pending" });
    });
});

app.patch("/users/api/:id", (req, res) => {
    return res.json({ status: "pending" })
})


app.delete("/users/api/:id", (req, res) => {
    return res.json({ status: "pending" })
})
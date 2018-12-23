const app = require("express")();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const api = require("./api");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

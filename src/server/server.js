const { PORT = 5000 } = process.env;
const app = require("./app");

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
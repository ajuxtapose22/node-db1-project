const server = require("./api/server.js");

const PORT = 9000;
// console.log(process.env.PORT)

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});

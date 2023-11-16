const express = require("express");
const path = require("path");

const app = express();

// Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/membersRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server started on http://localhost:${PORT}`);
});

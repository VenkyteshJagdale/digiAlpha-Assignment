let express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

//Middlewares
app.use(bodyParser.json());

let userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);

app.listen(4000, () => {
  console.log("server running on port 4000");
});

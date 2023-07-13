require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

//allow cross-origin req
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`the app listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

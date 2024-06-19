require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./database/db");
const port = process.env.PORT || 5000;
connectDB: () => {
  mongoose.connect(process.env.MONGODB_URL);
  const dbConnection = mongoose.connection;
  dbConnection.once("open", () => {
    console.log("Connected to database successfully..");
  });
  dbConnection.on("error", () => {
    console.log("Unable to connect to database");
    process.exit(1);
  });
};

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});

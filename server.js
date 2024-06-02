const express = require("express");
const { errorHandler } = require("./Middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const doteenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts",require("./Routes/contactsRoutes.js"));
app.use("/api/users",require("./Routes/usersRoutes.js"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
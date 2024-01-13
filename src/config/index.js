const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://kishan_v:kishan_v@cluster0.xlbod5i.mongodb.net/express_demo?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database Connected successfully");
  } catch (err) {
    console.log("=====err=====", err);
  }
};

module.exports = { dbConnection };

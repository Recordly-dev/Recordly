const mongoose = require("mongoose");

module.exports = {
  initMongo: async () => {
    await mongoose.connect(
      "mongodb+srv://cluster0.w49fl.mongodb.net/Recordly",
      { useNewUrlParser: true },
      (error) => {
        if (error) {
          console.log("mongodb connect error", error);
        } else {
          console.log("mongodb connect success!");
        }
      }
    );
  },
};

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then((data) => {
    if (data) {
      console.log("Connection Successful");
    }
  })
  .catch((error) => {
    console.log("Connection Fail");
  });

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    requied: true
  },
  lastName: {
    type: String,
    requied: true
  },
  email: {
    type: String,
    unique: true,
    requied: true
  },
  phone: {
    type: Number,
    requied: true
  },

},{
  timestamps: true, // This option adds the createdAt and updatedAt fields
});

module.exports = mongoose.model("user", userSchema);

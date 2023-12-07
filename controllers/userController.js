const User = require("../model/user");


// 1).Get All Users Data
const getAllUser = (req, res) => {
  User.find({})
    .then((users) => {
      console.log(users);
      if (users.length > 0) {
        res.json({
          statusCode: 200,message: 'Users fetched successfully',users: users,});
      } else {
        res.json({statusCode: 404,message: 'No users found'});
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({statusCode: 500,message: 'Internal Server Error'
      });
    });
};

// 2). Register New User
const registerUser = async (req, res) => {
  let registerUserData = req.body;
  console.log(registerUserData);
  if (!registerUserData) {
    return res.status(400).send("UserData not found in request body");
  }
  let userData = new User(registerUserData);
  let registerUser = await userData
    .save()
    .then((updateUser) => {
      res.json({
        statusCode: 200,message: 'Users fetched successfully',registerUser: updateUser});
    })
    .catch((error) => {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    });
};

// 3).Get User By Id
const getRegisterUserById = async (req, res) => {
  let getRegisterUserById = await User.findById(req.params.id)
    .then((getRegister) => {
      if (!getRegister) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        statusCode: 200,message: 'getRegister User fetched successfully',getRegisterById: getRegister});
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// 4).Update User
const updateRegisterUser = async (req, res) => {
  const updateRegisterUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((updatedRegisterUser) => {
      if (!updatedRegisterUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        statusCode: 200,message: 'register User update data fetched successfully',updatedRegisterUser: updatedRegisterUser});
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error"});
    });
};

// 5).Delete User
const deleteRegisterUser = async (req, res) => {
  const deleteRegisterUser = await User.findByIdAndDelete(req.params.id)
    .then((deleteRegisterUser) => {
      if (!deleteRegisterUser) {
        return res.status(404).json({ error: "User not found"});
      }
      res.json({
        statusCode: 200,message: 'register User update data fetched successfully',deleteRegisterUser: deleteRegisterUser});
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error"});
    });
};

// 6) Filter All user
const listAllRegisterUsers = async (req, res) => {
  const filters = {};

  if (req.query.firstName) {
    filters.firstName = new RegExp(req.query.firstName, "i");
  }

  if (req.query.lastName) {
    filters.lastName = new RegExp(req.query.lastName, "i");
  }

  if (req.query.email) {
    filters.email = new RegExp(req.query.email, "i");
  }

  if (req.query.phone) {
    filters.phone = new RegExp(req.query.phone, "i");
  }
  const users = await User.find(filters).select('-_id')
    .then((filtersUsers) => {
      if (!filtersUsers) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        statusCode: 200,message: 'register User filter data fetched successfully',filtersUsers: filtersUsers});
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error"});
    });
};

module.exports = {
  getAllUser,
  getRegisterUserById,
  registerUser,
  deleteRegisterUser,
  listAllRegisterUsers,
  updateRegisterUser
};

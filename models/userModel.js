const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a static method for our user to signup
// NOTE : we can not create a static method using arrow functions
UserSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email must be a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not string enough");
  }

  // check if user with this email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error(`Email ${email} already in use`);
  }

  // create hash of password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //this refers to User instance
  const user = await this.create({ email: email, password: hash });
  return user;
};


// static method for user login
UserSchema.statics.login= async function(email, password){
  // validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  // check if user with this email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error(`Incorrect email`);
  }
  
  // try to match the password
  const match= await bcrypt.compare(password, user.password);

  if(!match) {
    throw new Error(`Incorrect password`);
  }
  return user;
}
// create a User Model from userSchema
module.exports = mongoose.model("User", UserSchema);

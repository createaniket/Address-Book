const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a postive number");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      tolowercase: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.virtual('contacts', {
  ref: 'Contact',
  localField: '_id',
  foreignField:'owner'
})
userSchema.pre("save", async function (next) {
  const user = this;
  if(!this.isModified("password")){
      next();
  }
    const salt=await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
  next();
});
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token =jwt.sign({ _id: user._id.toString() }, process.env.Token_key);
  const tokens=user.tokens;
  tokens.push({token:token})
  user.tokens=tokens
  await user.save()
  return token;
};
userSchema.statics.findByCredetentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to find user");
  }
  const isMatch = await bcrypt.compare(password,user.password)
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
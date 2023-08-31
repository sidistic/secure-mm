import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Two types of users, consumer and support
export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

// Creates a schema for how each document will look inside
// our user collection(collection is table for MySQL).
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true, // timestamps = true will add 2 things to my schema: a createdAt and a updatedAt date value.
    collection: "users",
  }
);

userSchema.statics.createUser = async function (
    firstName,
    lastName,
    type
) {
    try {
        const user = await this.create({ firstName, lastName, type });
        return user;
    } catch (error) {
        throw error;
    }
}


userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({_id: id})
    if(!user) throw ({
      error: 'No user with this id found'
    })
    return user
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.deleteUserById = async function (id) {
  try {
    console.log(typeof(id));
    const result = await this.findByIdAndDelete(id);
    
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export default mongoose.model("User", userSchema);
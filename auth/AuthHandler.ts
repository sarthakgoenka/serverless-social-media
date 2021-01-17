import { User } from "../models/schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const signup = async (event, context) => {
  try {
    const output = await register(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (err) {
    return {
      body: JSON.stringify({ message: err.message }),
    };
  }
};

export const signin = async (event, context) => {
  try {
    const output = await login(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (err) {
    return {
      body: JSON.stringify({ message: err.message }),
    };
  }
};

async function register(eventBody) {
  const email = await User.query().findOne({ email: eventBody.email });
  const username = await User.query().findOne({ email: eventBody.username });
  if (email && username) {
    throw new Error("User with that email exists.");
  }
  const password = await bcrypt.hash(eventBody.password, 8);
  const user2 = await User.query().insertAndFetch({
    name: eventBody.name,
    username: eventBody.username,
    email: eventBody.email,
    password,
    id: uuidv4(),
  });
  const jwt = signToken(user2.id);
  return {
    ...user2,
    token: jwt,
  };
}
async function login(eventBody) {
  const user = await User.query().findOne({ email: eventBody.email });
  if (!user) {
    throw new Error("User with that email exists.");
  }
  if (!(await bcrypt.compare(eventBody.password, user.password))) {
    throw new Error("email or password is incorrect.");
  }

  return {
    ...user,
    token: signToken(user.id),
  };
}
function signToken(id) {
  return jwt.sign({ id: id }, "someSecret", {
    expiresIn: 86400,
  });
}

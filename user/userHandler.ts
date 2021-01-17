import { Response } from "./../src/helpers/response";
import { Follower, User } from "../models/schema";
import { v4 as uuidv4 } from "uuid";
import { Response } from "../src/helpers/response";

export const getProfile = async (event, context) => {
  try {
    console.log(event.requestContext.authorizer.principalId);
    const user = await User.query().findById(
      event.requestContext.authorizer.principalId
    );
    if (!user) throw new Error("Invalid token");
    return Response.success({
      user,
    });
  } catch (e) {
    console.error(e);
    return Response.error({
      error: e.message,
    });
  }
};

export const getProfileByUsername = async (event, context) => {
  try {
    const username = event.pathParameters.username;
    const user = await User.query().findOne({ username: username });
    if (!user) throw new Error("User not found");
    return Response.success({
      user,
    });
  } catch (e) {
    console.error(e);
    return Response.error({
      error: e,
    });
  }
};

export const toggleFollowing = async (event, context) => {
  try {
    const username = event.pathParameters.username;
    const user2 = await User.query().findOne({ username });
    if (!user2) throw new Error("Invalid username");
    const user1 = event.requestContext.authorizer.principalId;
    const user = await Follower.query().findOne({ user1, user2: user2.id });
    if (!user) {
      Follower.query()
        .insertAndFetch({
          user1: user1,
          user2: user2.id,
          id: uuidv4(),
        })
        .then((usr) => {
          return Response.success({
            message: "user Followed Sucessfully",
          });
        })
        .catch((err) =>
          Response.error({
            message: "",
          })
        );
    } else {
      Follower.query()
        .delete()
        .where({
          user1: user1,
          user2: user2.id,
        })
        .then((usr) => {
          return Response.success({
            message: "user Followed Sucessfully",
          });
        })
        .catch((err) =>
          Response.error({
            message: "",
          })
        );
    }
  } catch (e) {
    console.error(e);
    return Response.error({
      error: e.message,
    });
  }
};

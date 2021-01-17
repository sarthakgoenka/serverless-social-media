import jwt from "jsonwebtoken";

export const auth = (event, context, callback) => {
  const token = event.authorizationToken;
  if (!token) return callback(null, "Unauthorized1");
  jwt.verify(token, "someSecret", (err, decoded) => {
    if (err instanceof jwt.JsonWebTokenError)
      return callback(null, "Unauthorized2");

    const authResponse = {};
    authResponse.principalId = decoded.id;
    return callback(null, authResponse);
  });
};

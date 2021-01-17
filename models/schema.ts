import { Model } from "objection";
import KnexInstance from "../knex/knex";

Model.knex(KnexInstance);

export class User extends Model {
  static get jsonSchema() {
    return {
      type: "object",
      required: ["password", "username"],

      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  static get tableName() {
    return "users";
  }
}

export class Follower extends Model {
  static get tableName() {
    return "followers";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["user1", "user2"],

      properties: {
        id: { type: "string" },
        user1: { type: "string" },
        user2: { type: "string" },
      },
    };
  }
  // static get relationMappings() {
  //   return {
  //     user: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: "User",
  //       join: {
  //         from: "followers.user1",
  //         to: "users.id",
  //       },
  //     },
  //     profile: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: "User",
  //       join: {
  //         from: "followers.user2",
  //         to: "users.id",
  //       },
  //     },
  //   };
  // }
}

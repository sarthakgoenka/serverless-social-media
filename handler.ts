import { Response } from "./src/helpers/response";
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import knex from "./knex/knex";
import { User } from "./models/schema";

export async function hello(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const user = await User.query();

  return Response.success({
    user,
    message: "Go Serverless v2.0! Your function executed successfully!",
    context,
    event,
  });
}

export async function database(event: APIGatewayEvent, context: Context) {
  const operationMap = { up: knex.migrate.latest, down: knex.migrate.rollback };
  const operation = event.pathParameters.operation;

  try {
    const target: Function = operationMap[operation];
    if (!target) throw new Error("Unknown operation");
    const result = await target();
    console.log(result);
    return Response.success({
      message: "Go Serverless v2.0! Your function executed successfully!",
      context,
      event,
    });
  } catch (e) {
    console.error(e);
  }
}

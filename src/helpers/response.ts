export class Response {
  static async success(data: any, statusCode = 200): Promise<any> {
    return {
      statusCode,
      body: JSON.stringify(data),
    };
  }
  static async error(data: any, statusCode = 404): Promise<any> {
    return {
      statusCode,
      body: JSON.stringify(data),
    };
  }
}

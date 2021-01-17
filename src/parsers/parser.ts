export class Parser {
  static async success(data: any, statusCode = 200): Promise<any> {
    return {
      statusCode,
      body: JSON.stringify(data),
    };
  }
  static async eventParser(event) {
    return {
      body: event.body,
      pathParameters: event.pathParameters,
      headers: { ...event.headers },
    };
  }
}

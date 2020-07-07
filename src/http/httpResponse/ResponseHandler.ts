export class ResponseHandler {
  public static build(data: string | any, isMsg = true): string | any {
    try {
      if (isMsg) {
        return [{
          msg: data
        }]
      }

      return data
    } catch (e) {
      console.error(e)
    }
  }
}

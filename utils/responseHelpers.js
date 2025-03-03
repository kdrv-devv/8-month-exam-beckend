export class ResData {
    constructor(status, message, data) {
      this.status = status;
      this.message = message;
      if (data !== undefined) {
        this.data = data;
      }
    }
  }
  
/**
 * Created by ryanbrooks on 4/4/17.
 */
export class EnvironmentVariable {
  public userId:string;

  constructor() {
    this.userId = null;
  }

  setUserId(userId:string) {
    this.userId = userId;
  }

  getUserId():string {
    return this.userId;
  }
}

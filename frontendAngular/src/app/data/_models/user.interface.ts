export interface IUserCreate {
  firstName: string;
  lastName: string;
  age: number;
}

export interface IUser extends IUserCreate {
  id: number;
}

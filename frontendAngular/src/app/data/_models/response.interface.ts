export interface Response {
  error: boolean;
  message: string;
}
export interface CreateResponse extends Response {
  insertId: number;
}

export interface IRepository {
  name: string;
  stargazers_count: number;
}

export interface IResponse {
  items: IRepository[];
}

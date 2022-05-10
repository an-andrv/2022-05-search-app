export interface IRepository {
  name: string;
  stargazers_count: number;
  html_url: string;
}

export interface IResponse {
  items: IRepository[];
}

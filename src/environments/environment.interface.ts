export interface IUrlsRewrite {
  searchByName:  (name: string) => string;
}

export interface Environment {
  production: boolean;
  urls: IUrlsRewrite;
}

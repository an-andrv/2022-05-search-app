import { IUrlsRewrite } from "./environment.interface";

export const urls: IUrlsRewrite = {
  searchByName: (name: string) => `https://api.github.com/search/repositories?q=${name}&per_page=20`,
};

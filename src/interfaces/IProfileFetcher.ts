export interface IProfileFetcher {
  fetchProfile(url: string): Promise<string>;
}

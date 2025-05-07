export interface IProfileFetcher {
  fetchProfile(url: string): Promise<string>;

  fetchPosts(url: string): Promise<string[]>;
}

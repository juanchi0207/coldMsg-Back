import { IProfileFetcher } from '../interfaces/IProfileFetcher';

export class LinkedinFetcher implements IProfileFetcher {
  async fetchProfile(url: string): Promise<string> {
    return `Perfil simulado para ${url}`;
  }

  async fetchPosts(url: string): Promise<string[]> {
    return [
      'Post simulado 1 para ' + url,
      'Post simulado 2 para ' + url,
      'Post simulado 3 para ' + url
    ];
  }
}

import { IProfileFetcher } from '../interfaces/IProfileFetcher';

export class DummyLinkedInFetcher implements IProfileFetcher {
  async fetchProfile(url: string): Promise<string> {
    return `Perfil simulado para ${url}`;
  }
}

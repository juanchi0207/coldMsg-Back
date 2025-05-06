import { OpenAIProfileSummarizer } from "../adapters/openaiAdapter";

export class ProfileSummarizerService {
    constructor(private readonly summarizer: OpenAIProfileSummarizer) {}
  
    async getRecipientSummary(profileData: any): Promise<string> {
      return await this.summarizer.summarizePerfil(profileData);
    }
  }
import { OpenAIgetCaracteristics } from "../adapters/openaiAdapter";

export class ProfileSummarizerService {
    constructor(private readonly summarizer: OpenAIgetCaracteristics) {}
  
    async getRecipientSummary(profileData: any, postsData: any): Promise<string> {
      const characteristics = await this.summarizer.getCharacteristics(profileData, postsData);
      return JSON.stringify(characteristics);
    }
    async getSenderSummary(profileData: any, postsData: any): Promise<string> {
      return JSON.stringify(await this.summarizer.getCharacteristics(profileData, postsData));
    }
  }
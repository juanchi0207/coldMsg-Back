export interface IMessageGenerator {
  generateMessages(prompt: string): Promise<string[]>;
}

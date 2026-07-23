import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "../webhook-repository";

export class InMemoryWebhookRepository implements WebhookRepository {
  public webhooks: Webhook[] = []
  
  async findByUniquePath(uniquePath: string) {
    const webhook = this.webhooks.find(wh => wh.uniquePath === uniquePath)
    return webhook ?? null    
  }

  async findAll(userReferenceId: string) {
    const webhooks = this.webhooks.filter(wh => wh.userReferenceID.toString() === userReferenceId)
    return webhooks
  }

  async save(webhook: Webhook) {
    this.webhooks.push(webhook)
  }
}
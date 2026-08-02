import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "../webhook-repository";

export class InMemoryWebhookRepository implements WebhookRepository {
  public webhooks: Webhook[] = []
  
  async findByUniquePath(uniquePath: string) {
    const webhook = this.webhooks.find(wh => wh.uniquePath === uniquePath)
    return webhook ?? null    
  }

  async findAll(creatorID: string) {
    const webhooks = this.webhooks.filter(wh => wh.creatorID.toString() === creatorID)
    return webhooks
  }

  async save(webhook: Webhook) {
    const whIndex = this.webhooks.findIndex(wh => wh.uniquePath === webhook.uniquePath)
  
    this.webhooks[whIndex] = webhook
  }

  async create(webhook: Webhook) {
    this.webhooks.push(webhook)
  }
}
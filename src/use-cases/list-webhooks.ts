import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "@/repositories/webhook-repository";

interface ListWebhooksRequest {
  userReferenceId: string
}

export class ListWebhooks {
  async execute(props: ListWebhooksRequest, webhookRepository: WebhookRepository): Promise<Webhook[]> {
    const webhooks = await webhookRepository.findAll(props.userReferenceId)
    return webhooks
  }
}
import type { Webhook } from "@/entities/webhook";

interface WebhookMapperDTO {
  id: string 
  uniquePath: string
  status: boolean
  creatorID: string 
}

export class WebhookMapper {
  static toDTO(webhook: Webhook): WebhookMapperDTO {
    return {
      id: webhook.id.toString(),
      uniquePath: webhook.uniquePath,
      status: webhook.status,
      creatorID: webhook.creatorID.toString()
    }
  }
}
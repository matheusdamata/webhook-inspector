import type { Webhook } from "@/entities/webhook";

interface WebhookMapperDTO {
  id: string 
  uniquePath: string
  status: boolean
  userReferenceID: string 
}

export class WebhookMapper {
  static toDTO(webhook: Webhook): WebhookMapperDTO {
    return {
      id: webhook.id.toString(),
      uniquePath: webhook.uniquePath,
      status: webhook.status,
      userReferenceID: webhook.userReferenceID.toString()
    }
  }
}
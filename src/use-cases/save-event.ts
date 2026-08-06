import { WebhookEvent } from "@/entities/webhook-event";
import type { WebhookRepository } from "@/repositories/webhook-repository";
import { ERROR_MESSAGES } from "@/shared/error-messages";

interface SaveEventRequest {
  creatorID: string
  fromIP: string
  headers: Record<string, string>
  uniquePath: string
  queryParams?: string
  body?: Record<string, string>
}

export class SaveEventUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: SaveEventRequest): Promise<void> {
    const webhook = await this.webhookRepository.findByUniquePath(props.uniquePath)
   
    if (!webhook) throw new Error(ERROR_MESSAGES["NOT_FOUND"])

    const hasSameCreatorID = webhook.hasSameCreatorID(props.creatorID)
    
    if(!hasSameCreatorID) throw new Error(ERROR_MESSAGES["CREATOR_ID_MISMATCH"])

    const webhookEvent = WebhookEvent.create({
      webhookID: webhook.id,
      fromIP: props.fromIP,
      headers: WebhookEvent.convertObjectToString(props.headers),
      queryParams: props.queryParams ?? undefined,
      body:  props.body ? WebhookEvent.convertObjectToString(props.body) : undefined
    })
  
    webhook.addEvent(webhookEvent)

    await this.webhookRepository.save(webhook)
  }
}
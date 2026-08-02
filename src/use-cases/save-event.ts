import { WebhookEvent } from "@/entities/webhook-event";
import type { WebhookRepository } from "@/repositories/webhook-repository";

interface SaveEventRequest {
  caller: string
  creatorID: string
  uniquePath: string
  body?: Record<string, string>
}

export class SaveEventUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: SaveEventRequest): Promise<void> {
    const webhook = await this.webhookRepository.findByUniquePath(props.uniquePath)
   
    if (!webhook) throw new Error('Webhook not found.')

    const hasSameCreatorID = webhook.hasSameCreatorID(props.creatorID)
    
    if(!hasSameCreatorID) throw new Error('Webhook does not belong to creatorID.')

    const webhookEvent = WebhookEvent.create({
      caller: props.caller,
    })

    if (props.body) webhookEvent.body = WebhookEvent.convertObjectToString(props.body)
  
    webhook.addEvent(webhookEvent)

    await this.webhookRepository.save(webhook)
  }
}
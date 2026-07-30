import { UniqueEntityID } from "@/entities/unique-entity-id"
import { Webhook } from "@/entities/webhook"
import type { WebhookRepository } from "@/repositories/webhook-repository"

interface CreateWebhookRequest {
  uniquePath: string
  userReferenceID: string
}

export class CreateWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: CreateWebhookRequest): Promise<void> { 
    const invalidUserReferenceID = props.userReferenceID.length === 0 || props.userReferenceID === null || props.userReferenceID === undefined
    
    if (invalidUserReferenceID) throw new Error('It is necessary to forward the userReferenceID.')

    const isAnExistingWebhook = await this.webhookRepository.findByUniquePath(props.uniquePath)
    
    if (isAnExistingWebhook) throw new Error('A webhook with this unique path already exists.')

    const webhook = Webhook.create({
      uniquePath: props.uniquePath,
      status: true,
      expirationAt: '2h',
      userReferenceID: new UniqueEntityID(props.userReferenceID)
    })

    await this.webhookRepository.save(webhook)
  }
}
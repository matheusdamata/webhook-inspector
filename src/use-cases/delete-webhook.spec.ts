import { InMemoryWebhookRepository } from "@/repositories/in-memory/in-memory-webhook-repository"
import { DeleteWebhookUseCase } from "./delete-webhook"
import { UniqueEntityID } from "@/entities/unique-entity-id"
import { makeWebhook } from "../../___test___/factories/make-webhook"
import { makeWebhookEvent } from "../../___test___/factories/make-webhook-event"

let inMemoryWebhookRepository: InMemoryWebhookRepository
let sut: DeleteWebhookUseCase

describe('Delete Webhook', () => {
  beforeEach(() => {
    inMemoryWebhookRepository = new InMemoryWebhookRepository()
    sut = new DeleteWebhookUseCase(inMemoryWebhookRepository)
  })

  it('should be able to delete a webhook and its events', async () => {
    const creatorID = new UniqueEntityID()

    const webhook = makeWebhook({
      creatorID,
    })

    inMemoryWebhookRepository.create(webhook)

    for (let i = 1; i <= 5; i++) {
      const webhookEvent = makeWebhookEvent({
        webhookID: webhook.id,
        body: `{"event": "event-0${i}`,
      })

      webhook.events.push(webhookEvent)
    }
    
    inMemoryWebhookRepository.save(webhook)

    expect(inMemoryWebhookRepository.webhooks).toHaveLength(1)
    expect(inMemoryWebhookRepository.webhooks[0].events).toHaveLength(5)
    
    await sut.execute({
      uniquePath: webhook.uniquePath,
    })
    
    expect(inMemoryWebhookRepository.webhooks).toHaveLength(0)
  })
})
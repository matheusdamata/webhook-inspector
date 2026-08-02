import { InMemoryWebhookRepository } from "@/repositories/in-memory/in-memory-webhook-repository"
import { SaveEventUseCase } from "./save-event"
import { makeWebhook } from "../../___test___/factories/make-webhook"
import { UniqueEntityID } from "@/entities/unique-entity-id"

let inMemoryWebhookRepository: InMemoryWebhookRepository
let sut: SaveEventUseCase

describe('Save Event', () => {
  beforeEach(() => {
    inMemoryWebhookRepository = new InMemoryWebhookRepository()
    sut = new SaveEventUseCase(inMemoryWebhookRepository)
  })

  it('should be possible to save an event to a webhook', async () => {
    const creatorID = new UniqueEntityID('user-12345')
    
    const webhook = makeWebhook({
      creatorID,
      uniquePath: '/my-webhook',
    })

    inMemoryWebhookRepository.create(webhook)

    const eventBody = {
      status: 'payment.created',
      paymentId: '12345-12345-12345',
    }

    await sut.execute({
      caller: 'https://external-server.com/api/notification',
      creatorID: creatorID.toString(),
      uniquePath: '/my-webhook',
      body: eventBody,
    })

    expect(inMemoryWebhookRepository.webhooks).toHaveLength(1)
    expect(inMemoryWebhookRepository.webhooks[0].events[0].caller).toEqual('https://external-server.com/api/notification')
    expect(inMemoryWebhookRepository.webhooks[0].events[0].body).toEqual('{"status":"payment.created","paymentId":"12345-12345-12345"}')
  })
})
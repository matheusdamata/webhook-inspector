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

    const headers = {
      host: 'localhost:3333',
      'content-type': 'application/json',
      accept: '*/*',
      'accept-language': '*',
      'user-agent': 'curl/8.7.1',
      'accept-encoding': 'gzip, br',
      'content-length': '28'
    }

    const queryParams = '/?user=matheusdamatag'

    const eventBody = {
      status: 'payment.created',
      paymentId: '12345-12345-12345',
    }

    await sut.execute({
      fromIP: '1.1.1.1', 
      creatorID: creatorID.toString(),
      uniquePath: '/my-webhook',
      headers,
      queryParams,
      body: eventBody,
    })

    expect(inMemoryWebhookRepository.webhooks).toHaveLength(1)
    expect(inMemoryWebhookRepository.webhooks[0].events[0].fromIP).toEqual('1.1.1.1')
    expect(inMemoryWebhookRepository.webhooks[0].events[0].queryParams).toEqual('/?user=matheusdamatag')
    expect(inMemoryWebhookRepository.webhooks[0].events[0].body).toEqual('{"status":"payment.created","paymentId":"12345-12345-12345"}')
  })
})
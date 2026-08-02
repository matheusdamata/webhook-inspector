import { CreateWebhookUseCase } from "./create-webhook"
import { InMemoryWebhookRepository } from "@/repositories/in-memory/in-memory-webhook-repository"
import { makeWebhook } from "../../___test___/factories/make-webhook"
import { Webhook } from "@/entities/webhook"

let inMemoryWebhookRepository: InMemoryWebhookRepository
let sut: CreateWebhookUseCase

describe('Create webhook', () => {
  beforeEach(() => {
    inMemoryWebhookRepository = new InMemoryWebhookRepository()
    sut = new CreateWebhookUseCase(inMemoryWebhookRepository)
  })

  it('should be able to create a webhook', async () => {
    await sut.execute({
      uniquePath: 'my-webhook',
      creatorID: 'user-12345'
    })

    expect(inMemoryWebhookRepository.webhooks).toHaveLength(1)
    expect(inMemoryWebhookRepository.webhooks[0].uniquePath).toEqual('my-webhook')
  })

  it('should be able to create the webhook with the correct expiration time', async () => {
    await sut.execute({
      uniquePath: '/my-webhook',
      creatorID: 'user-12345',
    })

    expect(inMemoryWebhookRepository.webhooks).toHaveLength(1)
    expect(inMemoryWebhookRepository.webhooks[0].uniquePath).toEqual('/my-webhook')

    const webhookCreated = inMemoryWebhookRepository.webhooks[0]
    
    const expiresIn = Webhook.calculateExpiration(webhookCreated.expirationTime, webhookCreated.createdAt)
    const expirationDataIsCorrect = expiresIn.getTime() === webhookCreated.expiresIn.getTime()
    expect(expirationDataIsCorrect).toBeTruthy()
  })

  it('it should not be possible to create a webhook with the same path', async () => {
    const webhook = makeWebhook({
      uniquePath: 'my-webhook',
    })

    inMemoryWebhookRepository.create(webhook)

    await expect(sut.execute({
      uniquePath: 'my-webhook',
      creatorID: 'user-12345'
    })).rejects.toThrow('A webhook with this unique path already exists.')
  })

  it('it should not be possible to create a webhook without a creatorID', async () => {
    await expect(sut.execute({
      uniquePath: '/my-webhook',
      creatorID: '',
    })).rejects.toThrow('It is necessary to forward the creatorID.')
  })
})
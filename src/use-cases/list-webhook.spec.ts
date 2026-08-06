import { InMemoryWebhookRepository } from "@/repositories/in-memory/in-memory-webhook-repository"
import { ListWebhooksUseCase } from "./list-webhooks"
import { makeWebhook } from "../../___test___/factories/make-webhook"
import { UniqueEntityID } from "@/entities/unique-entity-id"
import { ERROR_MESSAGES } from "@/shared/error-messages"

let inMemoryWebhookRepository: InMemoryWebhookRepository
let sut: ListWebhooksUseCase

describe('List webhook', () => {
  beforeEach(() => {
    inMemoryWebhookRepository = new InMemoryWebhookRepository()
    sut = new ListWebhooksUseCase(inMemoryWebhookRepository)
  })

  it('should be able to list the user webhooks', async () => {
    const userID = new UniqueEntityID()

    for (let i = 1; i <= 5; i++) {
      const webhook = makeWebhook({
        creatorID: userID,
        uniquePath: `my-webhook-0${i}`
      })

      inMemoryWebhookRepository.create(webhook)
    }

    const result = await sut.execute({ creatorID: userID.toString() })

    expect(result).toHaveLength(5)
    expect(result[0].creatorID).toEqual(userID)
    expect(result[0].uniquePath).toEqual('my-webhook-01')
  })

  it('should not be able to list webhooks for a not found creator', async () => {
    await expect(sut.execute({
      creatorID: 'not-found'
    })).rejects.toThrow(ERROR_MESSAGES["not-found"])
  })

  it('should not be able to list another users webhooks', async () => {
    const userIDOne = new UniqueEntityID()
    const userIDTwo = new UniqueEntityID()

    for (let i = 1; i <= 5; i++) {
      const userOneWebhook = makeWebhook({
        creatorID: userIDOne,
        uniquePath: `my-webhook-0${i}`,
      })
      const userTwoWebhook = makeWebhook({
        creatorID: userIDTwo,
        uniquePath: `my-webhook-1${i}`,
      })

      await inMemoryWebhookRepository.create(userOneWebhook)
      await inMemoryWebhookRepository.create(userTwoWebhook)
    }

    const result = await sut.execute({ creatorID: userIDOne.toString() })
    expect(result).toHaveLength(5)
    expect(result).toEqual([
      expect.objectContaining({ creatorID: userIDOne, uniquePath: 'my-webhook-01' }),
      expect.objectContaining({ creatorID: userIDOne, uniquePath: 'my-webhook-02' }),
      expect.objectContaining({ creatorID: userIDOne, uniquePath: 'my-webhook-03' }),
      expect.objectContaining({ creatorID: userIDOne, uniquePath: 'my-webhook-04' }),
      expect.objectContaining({ creatorID: userIDOne, uniquePath: 'my-webhook-05' }),
    ])
  })
})
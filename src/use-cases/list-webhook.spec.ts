import { InMemoryWebhookRepository } from "@/repositories/in-memory/in-memory-webhook-repository"
import { ListWebhooksUseCase } from "./list-webhooks"
import { makeWebhook } from "../../___test___/factories/make-webhook"
import { UniqueEntityID } from "@/entities/unique-entity-id"

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
        userReferenceID: userID,
        uniquePath: `my-webhook-0${i}`
      })

      await inMemoryWebhookRepository.save(webhook)
    }

    const result = await sut.execute({ userReferenceId: userID.toString() })

    expect(result).toHaveLength(5)
    expect(result[0].userReferenceID).toEqual(userID)
    expect(result[0].uniquePath).toEqual('my-webhook-01')
  })

  it('should not be able to list another users webhooks', async () => {
    const userIDOne = new UniqueEntityID()
    const userIDTwo = new UniqueEntityID()

    for (let i = 1; i <= 5; i++) {
      const userOneWebhook = makeWebhook({
        userReferenceID: userIDOne,
        uniquePath: `my-webhook-0${i}`,
      })
      const userTwoWebhook = makeWebhook({
        userReferenceID: userIDTwo,
        uniquePath: `my-webhook-1${i}`,
      })

      await inMemoryWebhookRepository.save(userOneWebhook)
      await inMemoryWebhookRepository.save(userTwoWebhook)
    }

    const result = await sut.execute({ userReferenceId: userIDOne.toString() })
    expect(result).toHaveLength(5)
    expect(result).toEqual([
      expect.objectContaining({ userReferenceID: userIDOne, uniquePath: 'my-webhook-01' }),
      expect.objectContaining({ userReferenceID: userIDOne, uniquePath: 'my-webhook-02' }),
      expect.objectContaining({ userReferenceID: userIDOne, uniquePath: 'my-webhook-03' }),
      expect.objectContaining({ userReferenceID: userIDOne, uniquePath: 'my-webhook-04' }),
      expect.objectContaining({ userReferenceID: userIDOne, uniquePath: 'my-webhook-05' }),
    ])
  })
})
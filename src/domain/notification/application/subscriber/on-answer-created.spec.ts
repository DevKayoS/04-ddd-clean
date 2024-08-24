import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachment"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository

describe('On Answer Created', ()=> {
  beforeEach(()=> {
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository)
  })

  it('should send a notification when an answer ios created', async()=> {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswerRepository.create(answer)

  })
})
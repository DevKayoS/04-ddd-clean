import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
  override: Partial<QuestionProps> = {}
) {
  const question =  Question.create({
    authorId: new UniqueEntityId(),
    title: 'example question',
    content: 'conteudo da nova pergunta',
    ...override
  })

  return question
}
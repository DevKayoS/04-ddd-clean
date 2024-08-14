import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"
import { Question } from "./question"

interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps>{
  get content(){
    return this.props.content
  }
  get authorId(){
    return this.props.authorId
  }
  get questionId(){
    return this.props.questionId
  }
  get createdAt(){
    return this.props.createdAt
  }
  get updatedAt(){
    return this.props.updatedAt
  }

  get excerpt() {
    /**
     * basicamente fazendo um resumo da resposta ele vai pegar o conteudo e pegar 
     * os primeiros 120 caracteres e no final vai substituir o espaço vazio por ...
     * 
     * ex:  
     * da pra vc fazer tal coisa no arch linux fazendo bla bla bla bla bla bla bla bla bla e com isso vc pega o hyprland e...
     *
     */
    return this.content.substring(0, 120).trimEnd().concat('...')
  }
  
  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    // atualizando o conteudo
    this.touch()
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId){
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)

    return answer
  }
}
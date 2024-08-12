import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects.ts/slug"
import { Entity } from "../../core/entities/entity"

interface QuestionProps {
  title: string,
  content: string,
  authorId: string
  slug: Slug
}

export class Question extends Entity{
  public title: string
  public slug: Slug
  public content: string
  public authorId: string

  constructor(props: QuestionProps, id?: string ){
    super(id)
    this.title = props.title
    this.slug = props.slug
    this.content = props.content
    this.authorId = props.authorId
  }
}
import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects.ts/slug"
import { Entity } from "../../core/entities/entity"

interface QuestionProps {
  title: string,
  content: string,
  authorId: string
  slug: Slug
}

export class Question extends Entity<QuestionProps>{
  

  constructor(props: QuestionProps, id?: string ){
    super(props, id)
  }
}
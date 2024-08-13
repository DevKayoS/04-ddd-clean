import {expect, test} from 'vitest'
import { UniqueEntityId } from './unique-entity-id'

test('it should be able to create a unique id', ()=> {
  const id = new UniqueEntityId()

  console.log(id)

  expect(id.value).toEqual(expect.any(String))
})
import { gql } from 'apollo-boost'
import { isValidObjectId } from 'mongoose'
import { graphqlClient } from '../utils/graphqlClient'

describe('Form Snippet graphql', () => {
  it('create form snippet', async () => {
    const createFormSnippet = gql`
        mutation formSnippetAdd($formData: FormSnippetInput!) {
            formSnippetAdd(formData: $formData) {
                id
                structure {
                    inputs {
                        type
                        name
                    }
                }
                published
            }
        }
    `

    const formData = {
      published: false,
      structure: {
        inputs: [{
          type: 'TEXT',
          name: 'sample-input'
        }]
      }
    }

    const response = await graphqlClient.mutate({
      mutation: createFormSnippet,
      variables: {
        formData
      }
    })

    expect(isValidObjectId(response.data.formSnippetAdd.id)).toBe(true)

    expect(response).toMatchObject({
      data: {
        formSnippetAdd: {
          ...formData
        }
      }
    })
  })
})
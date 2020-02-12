import { isValidObjectId } from 'mongoose'
import { graphqlClient } from '../utils/graphqlClient'
import { createFormMutation, getFormQuery } from "./queries"

describe('Form Snippet graphql', () => {
  const sampleFormData = {
    published: false,
    structure: {
      inputs: [{
        type: 'TEXT',
        name: 'sample-input',
        placeholder: 'sample-placeholder',
        label: 'sample-label'
      }]
    }
  }

  it('create form snippet', async () => {
    const response = await graphqlClient.mutate({
      mutation: createFormMutation,
      variables: {
        formData: sampleFormData
      }
    })

    expect(isValidObjectId(response.data.formSnippetAdd.id)).toBe(true)

    expect(response).toMatchObject({
      data: {
        formSnippetAdd: {
          ...sampleFormData
        }
      }
    })
  })

  it('get form snippet', async () => {
    const formId = await graphqlClient.mutate({
      mutation: createFormMutation,
      variables: {
        formData: sampleFormData
      }
    }).then((response) => response.data.formSnippetAdd.id)

    console.log(formId)

    const response = await graphqlClient.query({
      query: getFormQuery,
      variables: {
        userId: "",
        formId
      }
    })

    expect(response).toMatchObject({
      data: {
        formSnippet: {
          ...sampleFormData
        }
      }
    })
  })
})
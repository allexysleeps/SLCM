import { isValidObjectId } from 'mongoose'
import * as R from 'ramda'
import { graphqlClient } from '../utils/graphqlClient'
import {createFormMutation, getFormQuery, updateFormMutation} from "./queries"

interface FormInputs {
  type: string
  name: string
  label?: string
  placeholder?: string
}

interface FormStructure {
  inputs: FormInputs []
}

interface FormDataInput {
  published: boolean
  structure: FormStructure
}

describe('Form Snippet graphql', () => {
  const sampleFormData: FormDataInput = {
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
        formSnippetAdd: sampleFormData
      }
    })
  })

  it('get form snippet', async () => {
    const formId = await graphqlClient.mutate({
      mutation: createFormMutation,
      variables: {
        formData: sampleFormData
      }
    }).then((res) => res.data.formSnippetAdd.id)

    const response = await graphqlClient.query({
      query: getFormQuery,
      variables: {
        userId: "",
        formId
      }
    })

    expect(response).toMatchObject({
      data: {
        formSnippet: sampleFormData
      }
    })
  })

  it('update form snippet', async () => {
    const formId = await graphqlClient.mutate({
      mutation: createFormMutation,
      variables: {
        formData: sampleFormData
      }
    }).then((res) => res.data.formSnippetAdd.id)

    const updatedFormData = R.evolve({
      inputs: R.append({
        type: 'EMAIL',
        name: 'sample-email',
        placeholder: 'sample-placeholder',
        label: 'sample-label'
      }),
      published: R.always(true)
    }, sampleFormData)


    const response = await graphqlClient.mutate({
      mutation: updateFormMutation,
      variables: {
        formId,
        formData: updatedFormData
      }
    })

    expect(response).toMatchObject({
      data: {
        formSnippet: updatedFormData
      }
    })

    const getResponse = await graphqlClient.query({
      query: getFormQuery,
      variables: {
        userId: "",
        formId
      }
    })
  })
})
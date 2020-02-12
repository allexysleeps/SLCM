import { isValidObjectId } from 'mongoose'
import * as R from 'ramda'
import { FetchResult } from "apollo-link"
import { graphqlClient } from '../utils/graphqlClient'
import {createFormMutation, getFormQuery, updateFormMutation, removeFormMutation} from "./queries"

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

interface GraphqlResponse {
  data: {
    [operationName: string]: {
      published: boolean
      structure: FormStructure
      id: string
    }
  }
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

  function createSampleForm(formData: FormDataInput = sampleFormData): Promise<FetchResult> {
    return graphqlClient.mutate({
      mutation: createFormMutation,
      variables: {
        formData
      }
    })
  }

  function getFormById(formId: string): Promise<FetchResult>  {
    return graphqlClient.query({
      query: getFormQuery,
      variables: {
        userId: "",
        formId
      }
    })
  }

  const getFormId = (res: FetchResult): string => res.data.formSnippetAdd.id

  it('create form snippet', async () => {
    const response = await createSampleForm()

    expect(isValidObjectId(response.data.formSnippetAdd.id)).toBe(true)

    expect(response).toMatchObject({
      data: {
        formSnippetAdd: sampleFormData
      }
    })
  })

  it('get form snippet', async () => {
    const formId = await createSampleForm().then(getFormId)
    const formQueryResponse = await getFormById(formId)

    expect(formQueryResponse).toMatchObject({
      data: {
        formSnippet: {
          ...sampleFormData,
          id: formId
        }
      }
    })

    const formQueryErrors = await getFormById("555555555555555555555555")
      .catch((e) => e.graphQLErrors)

    expect(formQueryErrors.length).toBe(1)

    expect(formQueryErrors[0]).toMatchObject({
      message: 'Form not found',
      extensions: {
        code: "BAD_USER_INPUT"
      }
    })

  })

  it('update form snippet', async () => {
    const formId = await createSampleForm().then(getFormId)

    const updatedFormData = R.evolve({
      inputs: R.append({
        type: 'EMAIL',
        name: 'sample-email',
        placeholder: 'sample-placeholder',
        label: 'sample-label'
      }),
      published: R.always(true)
    }, sampleFormData)


    const updateMutationResponse = await graphqlClient.mutate({
      mutation: updateFormMutation,
      variables: {
        formId,
        formData: updatedFormData
      }
    })

    expect(updateMutationResponse).toMatchObject({
      data: {
        formSnippet: {
          id: formId,
          ...updatedFormData
        }
      }
    })

    const formQueryResponse = await getFormById(formId)

    expect(formQueryResponse).toMatchObject({
      data: {
        formSnippet: {
          id: formId,
          ...updatedFormData
        }
      }
    })
  })

  it('remove form snippet', async () => {
    const formId = await createSampleForm().then(getFormId)
    const removeStatus = await graphqlClient.mutate({
      mutation: removeFormMutation,
      variables: {
        formId
      }
    }).then((res) => res.data.formSnippetRemove)

    expect(removeStatus).toBe(true)

    const formQueryResponse = await getFormById(formId)
    // todo check for graphql NOT_FOUND error assertions
    expect(false).toBe(true)
  })
})
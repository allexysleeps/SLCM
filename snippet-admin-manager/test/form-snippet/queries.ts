import { gql } from "apollo-boost"

const formDataFields = gql`
    fragment FormDataFields on FormSnippetData {
        id
        structure {
            inputs {
                type
                name
                placeholder
                label
            }
        }
        published
    }
`

export const createFormMutation = gql`
    mutation formSnippetAdd($formData: FormSnippetInput!) {
        formSnippetAdd(formData: $formData) {
            ...FormDataFields
        }
    }
    ${formDataFields}
`

export const getFormQuery = gql`
    query formSnippet($formId: String!) {
        formSnippet(formId: $formId) {
            ...FormDataFields
        }
    }
    ${formDataFields}
`

export const updateFormMutation = gql`
    mutation formSnippetUpdate($formId: String!, $formData: FormSnippetInput!) {
        formSnippetUpdate(formId: $formId, formData: $formData) {
            ...FormDataFields
        }
    }
    ${formDataFields}
`

export const removeFormMutation = gql`
    mutation formSnippetRemove($formId: String!) {
        formSnippetRemove(formId: $formId)
    }
`
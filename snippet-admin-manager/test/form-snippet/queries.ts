import { gql } from "apollo-boost"

export const createFormMutation = gql`
    mutation formSnippetAdd($formData: FormSnippetInput!) {
        formSnippetAdd(formData: $formData) {
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
    }
`

export const getFormQuery = gql`
    query formSnippet($userId: String!, $formId: String!) {
        formSnippet(userId: $userId, formId: $formId) {
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
    }
`
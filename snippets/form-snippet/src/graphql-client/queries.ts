import { gql } from "apollo-boost";

export const structureQuery = gql`
  query formSnippet {
    formSnippet {
      structure(userId: "", formId: "") {
        inputs {
            name
            type
            label
            placeholder
        }
      }
    }
  }
`
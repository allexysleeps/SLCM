import path from 'path'
import fs from 'fs'
import { gql } from 'apollo-server-express'
import {DocumentNode} from "graphql"

export const getTypeDefs = (): DocumentNode  => {
  try {
    const typesStr = fs.readFileSync(path.resolve(__dirname, 'base.graphqls'), 'utf-8')
    return gql(typesStr)
  } catch (e) {
    console.log(e)
  }
}
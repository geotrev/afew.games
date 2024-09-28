"use client"

import { useTina } from "tinacms/dist/react"
import { EssayQuery } from "@/tina/__generated__/types"
import { EssayContent } from "./components/essay-content"

interface ClientPageProps {
  query: string
  variables: {
    relativePath: string
  }
  data: EssayQuery
}

export default function Essay(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return <EssayContent {...data.essay} />
}

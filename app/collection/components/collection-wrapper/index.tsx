"use client"

import propTypes from "prop-types"
import { Platform } from "app/types/games"
import { CollectionList } from "../collection-list"
import { CollectionSearch } from "app/components"

type CollectionWrapperProps = {
  games: Platform[]
  queryData: Array<string[]>
}

CollectionWrapper.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      platform: propTypes.string,
      games: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string,
          variant: propTypes.string,
          grade: propTypes.string,
          grader: propTypes.oneOf(["Wata", "VGA", "CGC", "P1G"]),
        })
      ),
    })
  ).isRequired,
  queryData: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
}

export function CollectionWrapper({
  games,
  queryData,
}: CollectionWrapperProps) {
  return (
    <CollectionSearch
      listComponent={CollectionList}
      games={games}
      queryData={queryData}
    />
  )
}

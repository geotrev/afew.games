"use client"

import propTypes from "prop-types"
import { DatabasePlatform } from "app/types/games"
import { DatabaseList } from "../database-list"
import { CollectionSearch } from "app/components"

type DatabaseWrapperProps = {
  games: DatabasePlatform[]
  queryData: Array<string[]>
}

DatabaseWrapper.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      platform: propTypes.string,
      games: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string,
          variants: propTypes.arrayOf(
            propTypes.shape({
              part_code: propTypes.string,
              satellite_code: propTypes.string,
              manufactured: propTypes.string,
              mpn: propTypes.string,
              notes: propTypes.string,
            })
          ),
        })
      ),
    })
  ).isRequired,
  queryData: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
}

export function DatabaseWrapper({ games, queryData }: DatabaseWrapperProps) {
  return (
    <CollectionSearch
      label="Search variants"
      placeholder="Mario Kart"
      listComponent={DatabaseList}
      games={games}
      queryData={queryData}
    />
  )
}

import { useState, useEffect } from "react"
import propTypes from "prop-types"
import { CollectionListToolbar } from "app/components"
import { CollectionItem } from "../collection-item"
import { CollectionListProps } from "./types"
import {
  StyledCollectionList,
  StyledCollectionMinimizeBar,
  StyledPlatformHeading,
} from "./styled"

CollectionList.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      variant: propTypes.string,
      grade: propTypes.string,
      grader: propTypes.oneOf(["Wata", "VGA", "CGC", "P1G"]),
    })
  ),
  label: propTypes.string,
  id: propTypes.string,
}

export function CollectionList({ games, label, id }: CollectionListProps) {
  const [opened, setOpened] = useState<boolean>(true)
  const length = games.length

  useEffect(() => {
    // Re-expand games while searching for visibility
    setOpened(true)
  }, [games])

  function renderList() {
    if (!opened) {
      return <StyledCollectionMinimizeBar />
    }

    return (
      <StyledCollectionList aria-labelledby={`header-${id}`} id={`list-${id}`}>
        {games.map((data) => (
          <CollectionItem key={`${data.name}-${data.grade}`} data={data} />
        ))}
      </StyledCollectionList>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <>
      <StyledPlatformHeading id={`header-${id}`}>{label}</StyledPlatformHeading>
      <CollectionListToolbar
        label="game"
        pluralLabel="games"
        itemsLength={length}
        id={id}
        opened={opened}
        setOpened={setOpened}
      />
      {renderList()}
    </>
  )
}

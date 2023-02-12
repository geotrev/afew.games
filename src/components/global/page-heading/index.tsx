import propTypes from "prop-types"
import { IPageHeadingProps } from "./types"

PageHeading.defaultProps = {
  liveSubheading: false,
}

PageHeading.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
  liveSubheading: propTypes.bool,
}

export function PageHeading({
  heading,
  subheading,
  liveSubheading,
}: IPageHeadingProps) {
  return (
    <>
      <h1>
        <span aria-hidden="true">./</span>
        {heading}
      </h1>
      {subheading && (
        <p
          aria-live={liveSubheading ? "polite" : undefined}
          aria-atomic={liveSubheading ? "true" : undefined}
        >
          {subheading}
        </p>
      )}
    </>
  )
}

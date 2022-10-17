import propTypes from "prop-types"

export type PageHeadingProps = {
  heading?: string
  subheading?: string
  liveSubheading?: boolean
}

export function PageHeading({
  heading,
  subheading,
  liveSubheading,
}: PageHeadingProps) {
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

PageHeading.defaultProps = {
  liveSubheading: false,
}

PageHeading.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
  liveSubheading: propTypes.bool,
}

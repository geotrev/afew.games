import propTypes from "prop-types"

export function PageHeading({ heading, subheading, liveSubheading }) {
  const liveProps = liveSubheading
    ? {
        "aria-live": "polite",
        "aria-atomic": "true",
      }
    : {}
  return (
    <>
      <h1>
        <span aria-hidden="true">./</span>
        {heading}
      </h1>
      {subheading && <p {...liveProps}>{subheading}</p>}
    </>
  )
}

PageHeading.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
  liveSubheading: propTypes.bool,
}

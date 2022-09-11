import propTypes from "prop-types"

export function PageHeading({ heading, subheading }) {
  return (
    <>
      <h1>
        <span aria-hidden="true">./</span>
        {heading}
      </h1>
      {subheading && <p>{subheading}</p>}
    </>
  )
}

PageHeading.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
}

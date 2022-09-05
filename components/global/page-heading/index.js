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

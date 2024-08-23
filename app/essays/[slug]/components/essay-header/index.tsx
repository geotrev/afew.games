import propTypes from "prop-types"
import { EssayHeaderProps } from "./types"

EssayHeader.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
}

export function EssayHeader({ title, description, date }: EssayHeaderProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 font-semibold">
        Published&nbsp;
        <time aria-labelledby="essay-heading" dateTime={date}>
          {date}
        </time>
      </p>
      <h1
        id="essay-heading"
        className="sm:text-4xl sm:leading-normal mb-4 text-2xl font-extrabold text-white"
      >
        {title}
      </h1>
      {description && (
        <p className="sm:leading-relaxed mb-6 text-lg font-light sm:text-2xl">
          {description}
        </p>
      )}
      <p className="font-semibold">{"By George W."}</p>
    </div>
  )
}

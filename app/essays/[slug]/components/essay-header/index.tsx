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
      <p className="badge badge-accent badge-outline mb-4 font-semibold">
        Published&nbsp;
        <time aria-labelledby="essay-heading" dateTime={date}>
          {date}
        </time>
      </p>
      <h1
        id="essay-heading"
        className="mb-4 text-2xl font-extrabold text-white sm:text-4xl sm:leading-normal"
      >
        {title}
      </h1>
      {description && (
        <p className="mb-6 text-lg font-light text-neutral-content sm:text-2xl sm:leading-relaxed">
          {description}
        </p>
      )}
      <p className="font-semibold">{"By George W."}</p>
    </div>
  )
}

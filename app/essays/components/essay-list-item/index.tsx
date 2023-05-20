import Link from "next/link"
import propTypes from "prop-types"
import { Essay } from "types/essays"

export const EssayListItem = ({ title, description, urlPath, date }: Essay) => (
  <li className="mb-12 flex flex-col">
    <p className="badge-accent badge-outline badge mb-1 text-xs font-semibold">
      Published&nbsp;
      <time dateTime={date}>{date}</time>
    </p>
    <h2 className="mb-1 text-xl font-bold text-white">
      <Link className="hover:underline" href={urlPath}>
        {title}
      </Link>
    </h2>
    <p className="text-neutral-content">{description}</p>
  </li>
)

EssayListItem.propTypes = {
  date: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  slug: propTypes.string,
  urlPath: propTypes.string,
}

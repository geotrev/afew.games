"use client"

import Link from "next/link"
import propTypes from "prop-types"
import { Essay } from "@/src/app/types"

function isNew(date: Date, days: number) {
  const today = new Date()
  const pastDate = new Date(today)
  pastDate.setDate(today.getDate() - days)

  return date >= pastDate && date <= today
}

export const EssayListItem = ({ title, description, urlPath, date }: Essay) => {
  const dateObj = new Date(date!)
  const isRecentPost = isNew(dateObj, 30)
  const publishDate = dateObj.toLocaleDateString().replaceAll("/", "-")

  return (
    <li className="mb-12 flex flex-col">
      <div className="mb-1 flex gap-2 font-semibold">
        <p className="badge badge-accent badge-outline text-xs">
          Published&nbsp;
          <time dateTime={date!}>{publishDate}</time>
        </p>
        {isRecentPost && <p className="badge badge-success text-xs">New</p>}
      </div>
      <h2 className="mb-1 text-xl font-bold text-white">
        <Link className="hover:underline" href={urlPath!}>
          {title}
        </Link>
      </h2>
      <p className="text-neutral-content">{description}</p>
    </li>
  )
}

EssayListItem.propTypes = {
  date: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  slug: propTypes.string,
  urlPath: propTypes.string,
}

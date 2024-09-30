"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { isEqual, isWithinInterval, subMonths } from "date-fns"
import propTypes from "prop-types"
import { Essay } from "types/essays"

export const EssayListItem = ({ title, description, urlPath, date }: Essay) => {
  const [isRecent, setIsRecent] = useState(false)
  const publishDate = new Date(date!).toLocaleDateString().replaceAll("/", "-")

  useEffect(() => {
    try {
      const currentDate = new Date()
      const recentOldestDate = subMonths(currentDate, 1)

      if (
        isWithinInterval(publishDate, {
          start: recentOldestDate,
          end: currentDate,
        }) ||
        isEqual(publishDate, currentDate) ||
        isEqual(publishDate, recentOldestDate)
      ) {
        setIsRecent(true)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        "Essay item: Couldn't set post status.",
        { title, publishDate },
        e
      )
    }
  }, [title, publishDate])

  return (
    <li className="mb-12 flex flex-col">
      <div className="mb-1 flex gap-2 font-semibold">
        <p className="badge badge-accent badge-outline text-xs">
          Published&nbsp;
          <time dateTime={date}>{publishDate}</time>
        </p>
        {isRecent && <p className="badge badge-success text-xs">New</p>}
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

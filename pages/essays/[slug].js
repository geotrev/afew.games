import { useState, useEffect } from "react"
import Layout from "components/layout"
import classNames from "classnames"
import { getEssayEntries } from "../../lib/get-essay-entries"
import styles from "./essay.module.scss"
import Types from "prop-types"

const getParams = (slug) => ({ params: { slug } })

export default function Essay({ urlPath, fileName }) {
  const [essay, setEssay] = useState(null)

  useEffect(() => {
    const url = "/api" + urlPath
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(({ essay }) => {
        setEssay(essay)
      })
      .catch((e) => {
        throw new Error("FETCH ENTRY ERROR:", e)
      })
  }, [urlPath, fileName])

  function renderEssay() {
    const { title, description, date, content } = essay

    return (
      <>
        <p className={[styles.essayItemTimePara]}>
          <time className={styles.essayItemTime} dateTime={date}>
            {date}
          </time>
        </p>
        <h1 className={styles.essayTitle}>{title}</h1>
        {description && (
          <p className={classNames(styles.essayDescription, "text-lg")}>
            {description}
          </p>
        )}
        <div
          className={styles.essayBody}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </>
    )
  }

  const bodyPlaceholderIterator = Array(10).fill(null)

  function renderLoader() {
    return (
      <>
        <div className={styles.empyStateContainer}>
          <div
            className={classNames(
              styles.animateBg,
              styles.bgHeightMd,
              styles.bgNarrow,
              styles.metadataAnim
            )}
          >
            <div className={styles.bgMask}></div>
          </div>
          <div
            className={classNames(
              styles.animateBg,
              styles.bgHeightXl,
              styles.titleAnim
            )}
          >
            <div className={styles.bgMask}></div>
          </div>
          <br />
          <div className={classNames(styles.animateBg, styles.descAnim)}>
            <div className={styles.bgMask}></div>
          </div>
          <br />
          <br />
          {bodyPlaceholderIterator.map((_, idx) => {
            return (
              <div
                key={idx}
                className={classNames(
                  styles.animateBg,
                  styles[`contentAnim-${idx}`],
                  styles.bgHeightMd
                )}
              >
                <div className={styles.bgMask}></div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <Layout>
      <article>{essay ? renderEssay() : renderLoader()}</article>
    </Layout>
  )
}

Essay.propTypes = {
  urlPath: Types.string.isRequired,
  fileName: Types.string.isRequired,
}

export async function getStaticPaths() {
  const entries = await getEssayEntries()
  const paths = entries.map((entry) => getParams(entry.slug))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const entries = await getEssayEntries()
  const props = entries.find((entry) => entry.slug === slug)
  return { props }
}

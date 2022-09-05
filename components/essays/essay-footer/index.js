import styles from "./styles.module.scss"

export function EssayFooter() {
  return (
    <>
      <p className={styles.essayFooter}>
        <em>
          Have questions or want to fact check me? Feel free to email me at{" "}
          <a href="mailto:contact@afew.games">contact@afew.games</a>.
        </em>
      </p>
      <p className={styles.essayFooter}>
        <em>
          <strong>{"George W."}</strong>{" "}
          {
            "is a web developer by day and avid game collector by night. He considers himself an amateur blogger and isn't sure why he's writing in the third person."
          }
        </em>
      </p>
    </>
  )
}

import { useState, ReactElement, ChangeEventHandler, useCallback } from "react"
import styles from "./styles.module.scss"

export function SiteFooter(): ReactElement {
  const [value, setValue] = useState("")

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value)
    },
    []
  )

  return (
    <div className={styles.siteFooter}>
      <div id="mc_embed_signup">
        <form
          action={process.env.APP_MAILCHIMP_URL}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to receive updates!</h2>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address</label>
              <input
                type="email"
                value={value}
                onChange={handleChange}
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                required
              />
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: `<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->`,
              }}
            ></span>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_acf8c99e20e4a8cb586c08f18_b9717b2033"
                tabIndex={-1}
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

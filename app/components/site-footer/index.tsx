"use client"

import { useContext } from "react"
import { Well } from "@zendeskgarden/react-notifications"
import { Span } from "@zendeskgarden/react-typography"
import { Grid } from "@zendeskgarden/react-grid"
import { Field, Toggle } from "@zendeskgarden/react-forms"
import { ThemeContext, ThemeLabels } from "app/theme-context"
import { SocialLinks } from "../social-links"
import { SubscribeForm } from "../subscribe-form"

export function SiteFooter() {
  const { base, setBase } = useContext(ThemeContext)

  const handleChange = () => {
    setBase(base === "dark" ? "light" : "dark")
  }

  return (
    <footer>
      <Well className="mb-6 mt-12">
        <Well.Title>Subscribe to A Few Games!</Well.Title>
        <Well.Paragraph className="!mb-4">
          Get occasional emails about game collecting. Unsubscribe at any time.
        </Well.Paragraph>
        <SubscribeForm />
      </Well>
      <Grid>
        <Grid.Row>
          <Grid.Col>
            <Span className="text-sm">
              &copy; 2022-{new Date().getFullYear()} A Few Games
            </Span>
          </Grid.Col>
          <Grid.Col textAlign="center" alignSelf="center">
            <Field>
              <Toggle checked={base === "light"} onChange={handleChange}>
                <Field.Label>{ThemeLabels[base]} Theme</Field.Label>
              </Toggle>
            </Field>
          </Grid.Col>
          <Grid.Col textAlign="end">
            <SocialLinks />
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </footer>
  )
}

"use client"

import { Well } from "@zendeskgarden/react-notifications"
import { SocialLinks } from "../social-links"
import { SubscribeForm } from "../subscribe-form"
import { Span } from "@zendeskgarden/react-typography"
import { Grid } from "@zendeskgarden/react-grid"

export function SiteFooter() {
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
          <Grid.Col textAlign="end">
            <SocialLinks />
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </footer>
  )
}

export function pageView(path_url: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window?.gtag?.("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    path_url,
  })
}

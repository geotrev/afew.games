export function pageView(path_url: string) {
  /* @ts-ignore */
  if (window && window.gtag) {
    /* @ts-ignore */
    window.gtag("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
      path_url,
    })
  }
}

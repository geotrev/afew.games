export function pageView(path_url) {
  window.gtag("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    path_url,
  })
}

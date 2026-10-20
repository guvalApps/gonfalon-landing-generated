;(() => {
  // Only the landing homes are the QR / Universal Link entry.
  // Legal pages and other routes stay in the browser.
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path !== '/' && path !== '/fr') return

  // TODO(prod): numeric App Store ID (App Store Connect → App Information → Apple ID).
  // Leave empty until the iOS app is on the store — mobile Safari will stay on the landing.
  const IOS_APP_STORE_ID = ''

  // TODO(prod): set to true after the Android app is on Play. Android App Links come later.
  const ANDROID_STORE_ENABLED = false
  const ANDROID_PACKAGE = 'com.guvalapps.gonfalon'

  const APP_STORE_URL = IOS_APP_STORE_ID ? `https://apps.apple.com/app/id${IOS_APP_STORE_ID}` : ''
  const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`

  if (IOS_APP_STORE_ID) {
    const banner = document.createElement('meta')
    banner.name = 'apple-itunes-app'
    banner.content = `app-id=${IOS_APP_STORE_ID}`
    document.head.appendChild(banner)
  }

  const ua = navigator.userAgent || ''
  const isIPad = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isIOS = /iPhone|iPod/i.test(ua) || isIPad
  const isAndroid = /Android/i.test(ua)

  if (isIOS && APP_STORE_URL) {
    window.location.replace(APP_STORE_URL)
    return
  }

  if (isAndroid && ANDROID_STORE_ENABLED) {
    window.location.replace(PLAY_STORE_URL)
  }
})()

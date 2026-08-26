import {token} from '$lib/sanity/api.server'
import {client} from '$lib/sanity/client'

// `useCdn: true` (the official template ships `false`) so SSR reads for regular
// visitors hit apicdn.sanity.io. Everything that needs fresh data already forces
// `useCdn: false` on its own: `handlePreviewMode` rebuilds this client per request,
// `loadQuery`'s drafts branch hardcodes it, and `validatePreviewUrl` overrides it.
export const serverClient = client.withConfig({
  token,
  useCdn: true,
  stega: true,
})

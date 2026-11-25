/** Public address of the site. Change NEXT_PUBLIC_SITE_URL in Cloudflare when hscle.com is set up. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hscle.pages.dev").replace(/\/$/, "");

/** Google Search Console "HTML tag" verification code (the content="..." value). Public by design. */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "WwpXJTovfP8IGk9KERExgNBq_QBCpOZrsUTKdo4ddZI";

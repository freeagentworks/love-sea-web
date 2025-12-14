import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ja', 'zh', 'ko'],

    // Used when no locale matches
    defaultLocale: 'ja'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ja|en|zh|ko)/:path*']
};

import React from 'react';
import '../../global.css';
import Providers from '../../contexts/Providers';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta
          name="theme-color"
          content="#f4f4f4"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <body>
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <div id="react-portal-modal-container" />
        </Providers>
      </body>
    </html>
  );
}

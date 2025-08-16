import React from 'react';
import '../global.css';
import Providers from '../contexts/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <meta
            name="description"
            content="Upfi - Image Uploader with Next.js + Chakra UI + Fauna DB"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

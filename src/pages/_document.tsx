import * as React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        // @ts-ignore
        ...initialProps.styles,
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script async src="https://scripts.simpleanalyticscdn.com/latest.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
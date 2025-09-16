import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="IDev Viewer Next.js Example" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* IDev Viewer 라이브러리 로드 */}
            <Script
                src="/idev-viewer.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    console.log('✅ IDev Viewer 라이브러리 로드 완료');
                }}
                onError={(e) => {
                    console.error('❌ IDev Viewer 라이브러리 로드 실패:', e);
                }}
            />

            <Component {...pageProps} />
        </>
    );
}

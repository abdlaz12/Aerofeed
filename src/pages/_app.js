// src/pages/_app.js
import '../styles/globals.css'; // Pastikan file ini ada di folder styles

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { app } from '../Utils/firebaseConfig';
import { useEffect } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (!app || !app.name) return;
        const analytics = getAnalytics();
        logEvent(analytics, 'page view');
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;

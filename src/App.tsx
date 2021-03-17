import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import { appRoutes } from 'routes';
import PrivateRoute from 'routes/PrivateRoute/PrivateRoute';

import { RootState } from 'store/root-reducer';
import { geti18nLanguage, switchI18nLanguage } from 'store/modules/i18n/i18n';

import toast from 'components/React/ToastNotifier/ToastNotifier';
import useAuthentication from 'services/authentication/AuthenticationService';

// Initialize Notification Toaster
toast.configure({
    position: "bottom-left",
    autoClose: 5000,
    closeButton: false,
    draggable: false,
});

function App() {
    const { i18nextData: { languageType } } = useSelector((state: RootState) => ({ i18nextData: state.i18nextData }))
    const dispatch = useDispatch();

    const { isAuthenticated } = useAuthentication();

    useEffect(() => {
        // Initialize i18n during mount as dynamic import
        // Synchronizing i18 state with redux state
        import('./i18n/i18n').then(i18n => {
            const persistedLanguage = geti18nLanguage();

            if (persistedLanguage && persistedLanguage !== languageType) {
                dispatch(switchI18nLanguage(persistedLanguage));
                i18n.default.changeLanguage(persistedLanguage);
            }
            else if (i18n.default.language !== languageType) {
                i18n.default.changeLanguage(languageType);
            }
        });
    }, [languageType, dispatch])

    // Disable Console
    useEffect(() => {
        // Disable Console during production
        if (process.env.NODE_ENV === 'production') {
            console.log = function () { };
            window.console.log = window.console.debug = window.console.info = window.console.error = function () { return false; }
        }
    }, [])

    return (
        <>
            {isAuthenticated() ?
                <PrivateRoute appRoutes={appRoutes.filter(route => route.type !== "unauthorized")} />
                :
                <PrivateRoute
                    appRoutes={appRoutes.filter(route => route.type === "unauthorized")}
                    redirectPath={[{ from: "*", to: "/product" }]}
                />
            }
        </>
    );
}

export default App;
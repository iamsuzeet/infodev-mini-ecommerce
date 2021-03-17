import React, { ReactElement, useCallback, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect, ConnectedProps, shallowEqual, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { string as YupString, object as YupObject } from 'yup';

import LoadingButton from 'components/React/LoadingButton/LoadingButton';
import FormikValidationError from 'components/React/FormikValidationError/FormikValidationError';

import { RootState } from 'store/root-reducer';
import { loginUser } from 'store/modules/login/login';
import { switchI18nLanguage } from 'store/modules/i18n/i18n';


import Logo from "assets/images/logo.png";
import loginImg from "assets/images/Sunset_&_Tea_Garden.jpg";
import { i18nLanguages } from 'i18n/i18n';


interface Props extends PropsFromRedux { }
export interface UserCredentials { username: string; password: string }

function Login(props: Props): ReactElement {
    const { loginData, loginUser, switchI18nLanguage } = props;

    const history = useHistory();
    const i18nextData = useSelector((state: RootState) => state.i18nextData, shallowEqual);

    const handleLogin = useCallback(async (userDetails: UserCredentials) => {
        const loginres = await loginUser(userDetails);
        if (loginres?.access_token) {
            history.push('/')
        }
    }, [loginUser, history])

    return (
        <div className="app bg-white">
            <div className="media-caption d-none d-md-block">
                <p>Sunset View from Tea Garden, Hile, Dhankuta</p>
                <p>Image by: Ameet Ranjit Photography</p>
            </div>
            <div className="container">
                <div className="auth-wrapper">
                    <div className="auth-box-left d-none d-md-block">
                        <div className="media-wrapper">
                            <img src={loginImg} className="img-fluid" alt="Sunset View from Tea Garden, Hile, Dhankuta" />
                        </div>
                    </div>
                    <div className="auth-box-right">
                        <ul className="list list-inline lang-select">
                            {i18nLanguages.map((lang) => (
                                <li className={i18nextData.languageType === lang.toLowerCase() ? "active" : ""} key={lang}>
                                    <a
                                        href="#/"
                                        onClick={e => {
                                            e.preventDefault();
                                            switchI18nLanguage(lang.toLowerCase())
                                        }}
                                    >
                                        {lang.toUpperCase()}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <LoginForm
                            handleLogin={handleLogin}
                            authorizing={loginData.isFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    loginData: state.loginData
})

const mapDispatchToProps = {
    loginUser: loginUser,
    switchI18nLanguage: switchI18nLanguage
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Login);


interface LoginFormProps {
    handleLogin: (credentials: UserCredentials) => void
    /**Status indicating if login is initiating */
    authorizing: boolean
}
const LoginForm = ({ authorizing, handleLogin }: LoginFormProps) => {
    const { t } = useTranslation(['login', 'register']);

    const [passwordView, showPassword] = useState(false);
    const togglePassword = () => showPassword(!passwordView);
    const [initialValue] = useState({ username: '', password: '' })

    const loginValidationSchema = YupObject().shape({
        username: YupString().required('login:input.username.error-required'),
        password: YupString().required('login:input.password.error-required'),
    })

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValue,
        validationSchema: loginValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(false);
            handleLogin(values);
        },
    });

    return (
        <form className="w-100 auth-body" onSubmit={handleSubmit}>
            <div className="logo-box">
                <img src={Logo} alt="यातायात व्यवस्था निर्देशनालय" />
                <ul className="list logo-text">
                    <li className="small">प्रदेश सरकार</li>
                    <li className="small">भौतिक पूर्वाधार विकास मन्त्रालय</li>
                    <li className="des font-bold">यातायात व्यवस्था निर्देशनालय</li>
                    <li className="small">प्रदेश नं १, इटहरी, सुनसरी</li>
                </ul>
            </div>
            <h5 className="mb-4 font-bold">{t("login:title")}</h5>
            <div className="form-group">
                <label htmlFor="username">{t("login:input.username.title")}</label>
                <input type="text" className="form-control" name="username" value={values.username} onChange={handleChange} autoFocus />
                <FormikValidationError name="username" errors={errors} touched={touched} />
            </div>

            <div className="form-group">
                <label htmlFor="password">{t("login:input.password.title")}</label>
                <div className="custom-input">
                    <input type="password" className="form-control" name="password" value={values.password} onChange={handleChange} />
                    <span className={`${passwordView ? "ic-view" : "ic-hidden"} text-coolGray600`} role="button" onClick={togglePassword}></span>
                    <FormikValidationError name="password" errors={errors} touched={touched} />
                </div>
                <div className="text-right mt-1 small">
                    <a href="#/" className="text-blue" onClick={e => e.preventDefault()}>{t("login:forgotPassword.title")}</a>
                </div>
            </div>

            <div className="auth-footer">
                <div className="flex-grow-1 des">
                    <span className="text-coolGray600">{t("login:dontHaveAnAccount.title")} </span>
                    <Link to="/register" className="text-blue">{t("register:title")}</Link>
                </div>
                <LoadingButton
                    className="btn btn-primary"
                    text={t("login:title")}
                    disabled={authorizing}
                    loading={authorizing}
                />
            </div>
        </form>
    )
}
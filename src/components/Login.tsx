import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import {loginTC} from "../bll/auth-reducer";
import {AppRootStateType} from "../bll/store";

const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'required fill';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password must have'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    });
    if (isLoggedIn) {
        return <Navigate to={'/todolist'}/>
    }
    return (
        <div className='main'>
            <div className='mainBlock'>
                <form onSubmit={formik.handleSubmit}>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email"/>

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Password"/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;

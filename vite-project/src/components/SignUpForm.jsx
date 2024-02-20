import React from "react" 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Formik form validation
const signUpSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
});

function SignUpForm() {

    const navigate = useNavigate();

    return (
        <Formik initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
        }}
        validationSchema={signUpSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                axios.post('https://dtesting.applikuapp.com/signup/', values)
            .then(response => {
                if(response.status === 201){
                    navigate('/')
                }
                setSubmitting(false);
            })
            .catch(err => {
                if(err.response) {
                    // error code from server
                    setErrors(err.response.data);
                }
                else {
                    // request did not work logs error message
                    console.log('Error', err.message);
                }
                setSubmitting(false);
            });
        }}>
            {({isSubmitting}) => (
                    <Form>
                        <h3>First name:</h3>
                        <Field type="text" name="first_name" />
                        <ErrorMessage name="first_name" component="p" />
        
                        <h3>Last name:</h3>
                        <Field type="text" name="last_name" />
                        <ErrorMessage name="last_name" component="p" />
                        
                        <h3>Email</h3>
                        <Field type="text" name="email" />
                        <ErrorMessage name="email" component="p" />

                        <h3>Username</h3>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="p" />

                        <h3>Password</h3>
                        <Field type="text" name="password" />
                        <ErrorMessage name="password" component="p" />
        
                        <button type="submit" disabled={isSubmitting}>Sign Up</button>
                    </Form>
                )}
        </Formik>
    )
}

export default SignUpForm;
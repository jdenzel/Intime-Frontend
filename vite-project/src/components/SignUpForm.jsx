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
        }}></Formik>
    )
}
import  { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'),
    password: Yup.string().required('Password Required'),
})

function LoginForm() {
    const navigate = useNavigate();

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
        validationSechema={loginSchema}
        onSubmit={(values, {setSubmitting, setErrors}) => {
            axios.post("https://intime.applikuapp.com/login/", values, { withCredentials:true })
                .then(response => {
                    if(response.status === 200) {
                        navigate('/')
                    }
                    setSubmitting(false)
                    .catch(error => {
                        setErrors(error.response)
                        setSubmitting(false)
                    });
                })
        }}>
            {({ isSubmitting }) => (
                <Form>
                    <h4>Username:</h4>
                    <Field type="text" name="username"/>
                    <ErrorMessage name="username" component="p"/>
                    
                    <h4>Password:</h4>
                    <Field type="text" name="password"/>
                    <ErrorMessage name="password" component="p"/>

                    <button type='submit' disabled={isSubmitting}>Log In</button>
                </Form>
            )}
        </Formik>
    )
}
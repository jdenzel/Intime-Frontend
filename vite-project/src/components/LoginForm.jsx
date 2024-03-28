import  { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// For <ErrorMessage/> in the client
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'), 
    password: Yup.string().required('Password Required'),
})

function LoginForm({ onLogin }) {
    const navigate = useNavigate();

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
        validationSechema={loginSchema}
        onSubmit={(values, {setSubmitting, setErrors}) => {
            axios.post("https://intime.applikuapp.com/login/", values, { withCredentials:true })
                .then(response => { // Expected Response from server: {"message": 'Login succesful!', 'user': {'id', 'username', 'first_name', 'last_name'}
                    if(response.status === 200) {
                        onLogin(response.data.user)
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        navigate('/')
                    }
                    setSubmitting(false)
                })
                .catch(error => {
                    setErrors(error) // Expected Response from server: {'message': 'Login unsuccesful', 'errors', status=400 BAD REQUEST}
                    setSubmitting(false)
                });
                
        }}>
            {({ isSubmitting }) => (
                <Form>
                    <h4>Username:</h4>
                    <Field type="text" name="username"/>
                    <ErrorMessage name="username" component="p"/> 
                    
                    <h4>Password:</h4>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="p"/>

                    <button type='submit' disabled={isSubmitting}>Log In</button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;
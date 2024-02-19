import  { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
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
        </Formik>
    )
}
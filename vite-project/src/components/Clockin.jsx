import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { form_data } from '../redux/action'
import { setClockedIn } from '../redux/slice'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'


const clockinSchema = Yup.object().shape({
    location: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
});

function Clockin() {
    const csrfToken = Cookies.get('csrftoken')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clockedIn = useSelector(state => state.clockedStatus.clockedIn)

    const handleSubmit = (values, { setSubmitting }) => {
        const form = {
            employee: '',
            first_name: '',
            last_name: '',
            clock_in_time: '',
            ...values,
    };
    axios.post('https://dtesting.applikuapp.com/clockin/', form, {
        headers: {
            'X-CSRFToken': csrfToken
        },
        withCredentials: true
    })
    .then(response => {
        dispatch(form_data(response.form))
        dispatch(setClockedIn());
        setSubmitting(false);
    })
    .catch(error => {
        console.log(error)
        setSubmitting(false);
    })

    return (

    )
}
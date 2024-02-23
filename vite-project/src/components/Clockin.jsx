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
    const [form, setForm] = useState({employee: user.id, first_name: user.first_name, last_name: user.last_name, clock_in_time: '', location: '', role: ''})


    return (

    )
}
import React from "react" 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const signUpSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
});
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setClockedOut } from "../redux/slice"
import axios from 'axios'
import Cookies from "js-cookie"

function Clockout() {
    const csrfToken = Cookies.get('csrftoken')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector(state => state.formValues.formData)
    const clockedIn = useSelector(state => state.clockedStatus.clockedIn)

    useEffect(() => {
        if(!clockedIn) {
            navigate('/clockin');
        }
    }, [clockedIn, navigate])

    const handleClockOut = () => {
        const form = {
            clock_out_time: new Date().toTimeString()
        }

        axios.patch(`https://dtesting.applikuapp.com/clockout/${clockInData.data.id}/`, data, {
            headers: {
                'X-CSRFToken': csrfToken
            },
            withCredentials: true
        })
        .then(response => {
            console.log(response)
            dispatch(setClockedOut())
            navigate('/clockin/')
        })
        .catch(error => {
            console.log(error)
        })
    }

}
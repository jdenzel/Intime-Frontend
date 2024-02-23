import { useState, useEffect } from "react"
import { UseDispatch, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setClockedOut } from "../redux/slice"
import axios from 'axios'
import Cookies from "js-cookie"

function Clockout() {
    const csrfToken = Cookies.get('csrftoken')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
}
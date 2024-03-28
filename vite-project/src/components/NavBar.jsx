import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function Navbar({ user, setUser })  {
    const csrfToken = Cookies.get('csrftoken')
    const navigate = useNavigate()
    // const user = JSON.parse(localStorage.getItem('user'))

    // const handleLogout = async() => {
    //     try {
    //         const r = await axios.post('https://intime.applikuapp.com/logout/', {}, {
    //             withCredentials: true });
    //         if(r.status === 204) {
    //             setUser(null);
    //             navigate('/login');
    //         } else {
    //             console.error("Logout failed status code: ", r.status);
    //         } 
    //     } catch(error) {
    //         console.error(error)
    //     }
    // }

    const handleLogout = () => {
        if(user) {
            navigate('/')
            setUser(null)
            localStorage.clear()
        }
        else {
            console.log("User could not be signed out")
        }
    }

    return (
        <div>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/clockin">Time Clock</Link>
            {/* <Link to="timesheet">Time Sheet</Link> */}
            <button onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    )
}

export default Navbar
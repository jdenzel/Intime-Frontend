import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function Navbar({ user, setUser })  {
    const csrfToken = Cookies.get('csrftoken')
    const auth_token = Cookies.get('auth_token')
    const navigate = useNavigate()
    // console.log(auth_token)
    // console.log(Cookies.get())

    const handleLogout = async() => {
        try {
            const r = await axios.post('https://intime.applikuapp.com/logout/', {}, {
                headers: {
                  'Authorization': `Bearer ${auth_token}`
                },
                withCredentials: true });
            if(r.status === 204) {
                setUser(null);
                navigate('/login');
            } else {
                console.error("Logout failed status code: ", r.status);
            } 
        } catch(error) {
            console.error(error)
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
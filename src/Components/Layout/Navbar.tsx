import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

interface UserProperties {
  firstName: String;
  lastName: String;
}


function Navbar() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const navigate = useNavigate();


  const verifyUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/user/session`, {
          method: "GET",
          credentials: "include",
          headers: {
              'Content-Type': 'application/json'
          }
      })

      if(response.status === 200) {
        const data: UserProperties = await response.json();
        setLoggedIn(true);
        setUser(`${data.firstName} ${data.lastName}`);
      }

    } catch (err) {
        navigate("?errorApiConn")
        console.log(err);
    }
    
  }

  useEffect(() => {
    setLoggedIn(false);
    verifyUser();
  }, [])

    return(
        <div>
            <nav className="navbar navbar-color navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">MANAMovieStudios</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link text-white active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-white" href="/">Movies</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-white" href="/">Top Reviews</a>
                    </li>
                  </ul>
                </div>
                <div className="d-flex">
                    <ul className="navbar-nav">
                        <li className="nav-item">

                          { isLoggedIn ? (
                            <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="bi bi-person-fill"></i> Hey, {user}
                              </a>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><i className="bi bi-person-lines-fill"></i> My Profile</a></li>
                                <li><a className="dropdown-item text-success" href="#"><i className="bi bi-file-earmark-plus"></i> Create a Movie</a></li>
                                <li><a className="dropdown-item text-danger" href="/signout"><i className="bi bi-box-arrow-left"></i> Sign Out</a></li>
                              </ul>
                            </li>
                          ) : (
                            <a className="nav-link text-white" href="/signin">
                              <i className="bi bi-person-fill"></i> Sign In
                            </a>
                          )}                          
                              
                        </li>
                    </ul>
                </div>
              </div>
            </nav>
        </div>
        )
}

export default Navbar;
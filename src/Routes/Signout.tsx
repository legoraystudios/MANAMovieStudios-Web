import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    const signOut = async () => {

        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/logout`, {
              method: "POST",
              credentials: "include",
              headers: {
                  'Content-Type': 'application/json'
              }
          })
    
          if(response.status === 200) {
            navigate(`/?successLoggedOut`);
          } else {
            navigate(`/?error`);
          }
    
        } catch (err) {
            navigate("?errorApiConn");
            console.log(err);
        }
    
}

    useEffect(() => {
        signOut();
    }, [])

    return(
      <p>Hold on while we sign you out...</p>
    )

}

export default Logout;
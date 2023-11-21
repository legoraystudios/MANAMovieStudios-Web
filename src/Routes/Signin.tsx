import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../Components/Layout/Alerts';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function Home() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {

        event.preventDefault();

        try {

            const payload = {username: username, password: password};

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                navigate('/signin?signInError');
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    useEffect(() => {
        document.title = "Sign In | MANAMovieStudios";
    }, []);

    return(
        <div>

            <Navbar />

            <body>

            <div className="container w-50 mt-5">

            <Alerts />

                <form onSubmit={handleSubmit}>
                    <h3>Sign in with your credentials:</h3>
                    <div className="mb-3 pt-4">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <a href="/register">New here? Register now.</a><br />
                        <button type="submit" className="btn btn-color my-3">Sign In</button>
                    </div>
                </form>
            </div>

            </body>

            <Footer />
            
        </div>
    )

}

export default Home;
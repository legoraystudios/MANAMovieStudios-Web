import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Alerts from '../Components/Layout/Alerts';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function Home() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState<Date | null>(null);
    const navigate = useNavigate();

    const formatDate = (date: any) => {
        return date.toISOString().split("T")[0];
    }

    const handleDOBChange = (date: Date | null) => {
        setDob(date);
      };

    const handleSubmit = async (event: any) => {

        event.preventDefault();

        const formattedDOB = formatDate(dob);

        try {

            const payload = {firstName: firstName, lastName: lastName, username: username, 
                password: password, dob: formattedDOB};

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                navigate('/');
            } else {
                navigate('/register?registerError');
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    useEffect(() => {
        document.title = "Register | MANAMovieStudios";
    }, []);

    return(
        <div>

            <Navbar />

            <body>

            <div className="container w-50 mt-5">

            <Alerts />

                <form onSubmit={handleSubmit}>
                    <h3>Register:</h3>
                        <div className="row pt-4">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 form-group">
                                        <label className="form-label">Date of Birth</label><br/>
                                        <DatePicker 
                                            selected={dob}
                                            onChange={handleDOBChange} 
                                            dateFormat="yyyy-MM-dd"
                                            maxDate={new Date()}
                                            showYearDropdown
                                            showMonthDropdown
                                            scrollableMonthYearDropdown 
                                            dropdownMode="select"
                                            showTimeSelect={false}
                                            className="form-control"
                                            />
                                </div>
                            </div>
                        </div>

                    <div>
                        <a href="/signin">Already registered? Sign In.</a><br />
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
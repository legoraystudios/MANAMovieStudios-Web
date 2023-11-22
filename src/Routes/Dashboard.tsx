import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Poster from '../Components/Images/poster.png';
import Stars from '../Components/Layout/Stars';
import Alerts from '../Components/Layout/Alerts';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { usePopper } from 'react-popper';
import { StringLiteral } from 'typescript';
import { create } from 'domain';

interface AccountProperties {
    id: any,
    firstName: string;
    lastName: string;
    dob: any;
}

interface CategoryProperties {
    id: any,
    categoryName: string;
}

interface MovieProperties {
    id: any;
    movieName: string,
    moviePlot: string,
    movieDirector: string,
    movieActors: string;
    category: {
        id: any;
        categoryName: string;
    }
}

interface ReviewProperties {
    id: any;
    reviewTitle: string;
    reviewText: string;
    reviewRating: Number;
    movieId: Number;
    movies: {
        movieName: string;
    }
}

function Profile() {

    const [loggedAccount, setLoggedAccount] = useState<AccountProperties | null>(null);
    const [searchUrlParams, setSearchUrlParams] = useSearchParams();
    const [myMovies, setMyMovies] = useState<MovieProperties[]>([]);
    const [categories, setCategories] = useState<CategoryProperties[]>([]);
    const [myReviews, setMyReviews] = useState<ReviewProperties[]>([]);
    const navigate = useNavigate();

    // Variables for editMovie();

    const [movieId, setMovieId] = useState("");
    const [movieName, setMovieName] = useState("");
    const [moviePlot, setMoviePlot] = useState("");
    const [movieDirector, setMovieDirector] = useState("");
    const [movieCategory, setMovieCategory] = useState("");
    const [movieActors, setMovieActors] = useState("");

    const validateSession = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/user/session`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();
    
            if (response.status === 200) {
                setLoggedAccount(data);
                getMyMovies(data.id);
                getMyReviews(data.id);
            } else {
                navigate("/signin");
            }
        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const getMyMovies = async (userId: any) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/user/${userId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();
            setMyMovies(data);
        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const getCategories = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/category/`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const createMovie = async (event: any) => {

        event.preventDefault();

        try {

            const payload = {movieName: movieName, moviePlot: moviePlot, movieDirector: movieDirector, movieActors: movieActors, categoryId: movieCategory}

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                navigate("/dashboard?movies&successCreatedMovie");
                window.location.reload();
            } else {
                navigate("/dashboard?movies&errorMovieExist");
                window.location.reload();
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const editMovie = async (event: any) => {

        event.preventDefault();

        try {

            const payload = {movieName: movieName, moviePlot: moviePlot, movieDirector: movieDirector, movieActors: movieActors, categoryId: movieCategory};

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/${movieId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                navigate("/dashboard?movies&successEditedMovie");
                window.location.reload();
            } else {
                navigate("/dashboard?movies&error");
                window.location.reload();
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const deleteMovie = async (movieId: any) => {
        try {

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/${movieId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                navigate("/dashboard?movies&successDeletedMovie");
                window.location.reload();
            } else {
                navigate("/dashboard?movies&error");
                window.location.reload();
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }
    }

    const getMyReviews = async (userId: any) => {
        try {

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/reviews/user/${userId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.status === 200) {
                const data = await response.json();
                setMyReviews(data);
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }
    }

    useEffect(() => {
        document.title = "My Dashboard | MANAMovieStudios";
        validateSession();
        getCategories();
    }, [])

    if(searchUrlParams.get("profile") !== null) {
        return (
            <div>

            <Navbar />

            {loggedAccount ? (
                <body>
                    <div className="container my-5">
                        <a href="/" className="py-2"><i className="bi bi-arrow-90deg-up"></i> Home</a>
                        <h3 key={loggedAccount.id}>Hey, {loggedAccount.firstName}!</h3>
                            <p>Welcome to your personal area.</p>
                    </div>

                    <div className="container mt-3">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard?profile">Profile</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/dashboard?movies">My Movies</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/dashboard?reviews">My Reviews</a>
                          </li>
                        </ul>
                    </div>

                    <div className="container">
                    <Alerts />
                        <div className="row">
                            <div className="col-sm-6 mt-3">
                                <h5>Account Information:</h5>
                                <table className="table w-50">
                                    <tbody>
                                        <tr>
                                          <td>Name: {loggedAccount.firstName} {loggedAccount.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth: {loggedAccount.dob}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </body>
            ) : (
                <div></div>
            )}



            <Footer />

        </div>
        )
    } else if(searchUrlParams.get("movies") !== null) {
        return (
            <div>
                <Navbar />

                    <body>

                        <div className="container my-5">
                            <a href="/" className="py-2"><i className="bi bi-arrow-90deg-up"></i> Home</a>
                            <h3 key={loggedAccount?.id}>Hey, {loggedAccount?.firstName}!</h3>
                                <p>Welcome to your personal area.</p>
                        </div>

                        <div className="container mt-5">
                            <ul className="nav nav-tabs">
                              <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/dashboard?profile">Profile</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link active" href="/dashboard?movies">My Movies</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="/dashboard?reviews">My Reviews</a>
                              </li>
                            </ul>
                        </div>

                        <div className="container my-5">
                        <Alerts />

                        <div className="d-flex justify-content-between">
                            <h3 className="my-3">My Movies</h3>
                            <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#createMovie" onClick={
                                () => {
                                    setMovieName("");
                                    setMoviePlot("");
                                    setMovieDirector("");
                                    setMovieActors("");
                                }

                            }><i className="bi bi-plus-lg"></i> Create Movie</button>
                        </div>

                                {
                                    myMovies.map(movieRecord => {
                                        return(
                                        <div>

                                            <div key={movieRecord.id} className="accordion accordion-flush" id="accordionExample">
                                              <div className="accordion-item list-inline">
                                                    <h2 className="accordion-header"></h2>
                                                        <div className="d-flex">
                                                            <button className="accordion-button list-inline-item float-start" type="button" data-bs-toggle="collapse" data-bs-target={`#movie-${movieRecord.id}`} aria-expanded="true" aria-controls="collapseOne">
                                                                {movieRecord.movieName}
                                                                <span className="badge rounded-pill text-bg-info list-inline-item mx-2">{movieRecord.category.categoryName}</span>
                                                                    <button type="button" className="btn btn-outline-primary my-1" data-bs-toggle="modal" data-bs-target={`#editMovie-${movieRecord.id}`} onClick={

                                                                        () => {
                                                                            setMovieId(movieRecord.id);
                                                                            setMovieName(movieRecord.movieName);
                                                                            setMoviePlot(movieRecord.moviePlot);
                                                                            setMovieDirector(movieRecord.movieDirector);
                                                                            setMovieCategory(movieRecord.category.id);
                                                                            setMovieActors(movieRecord.movieActors);
                                                                        }

                                                                    }><i className="bi bi-pencil-fill"></i></button>
                                                                    <button type="button" className="btn btn-outline-danger mx-2" onClick={() => deleteMovie(movieRecord.id)}><i className="bi bi-trash-fill"></i></button>
                                                            </button>
                                                        </div>
                                                    
                                                    <div id={`movie-${movieRecord.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                      <div className="accordion-body list-inline">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-6 flex-column mb-3">
                                                                <a href={`/movie/${movieRecord.id}`}><img src={Poster} alt="" height={350} /></a>
                                                                    <a type="button" className="btn btn-color d-flex col-2 mt-2" href={`/movie/${movieRecord.id}`}>View More</a>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <h5 className="list-inline-item text-desc">Movie Plot:</h5> <p className="list-inline-item">{movieRecord.moviePlot}</p><br />
                                                                <h5 className="list-inline-item text-desc">Movie Director:</h5> <p className="list-inline-item">{movieRecord.movieDirector}</p><br />
                                                                <h5 className="list-inline-item text-desc">Movie Actors:</h5> <p className="list-inline-item">{movieRecord.movieActors}</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                </div>
                                            </div>

                                            { /* Edit Movie Modal */ }

                                            <div className="modal fade" id={`editMovie-${movieRecord.id}`} tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                  <div className="modal-content">
                                                    <div className="modal-header">
                                                      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Movie</h1>
                                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={editMovie}>
                                                                <div className="row">
                                                                    <div className="mb-3 col-sm-12">
                                                                        <label className="form-label">Movie Title</label>
                                                                        <input type="text" className="form-control" name="editReviewTitle" value={movieName} onChange={(e) => setMovieName(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="mb-3 col-sm-12">
                                                                        <label className="form-label">Movie Plot</label>
                                                                        <textarea className="form-control" name="editReviewText" id="editReviewText" rows={3} value={moviePlot} onChange={(e) => setMoviePlot(e.target.value)}></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="mb-3 col-sm-6">
                                                                        <label className="form-label">Director</label>
                                                                        <input type="text" className="form-control" name="editReviewTitle" value={movieDirector} onChange={(e) => setMovieDirector(e.target.value)} required/>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <label className="form-label">Genre</label>
                                                                            <select className="form-select" value={movieCategory} onChange={(e) => setMovieCategory(e.target.value)}>
                                                                                {
                                                                                    categories && categories.map(record => {
                                                                                        return(
                                                                                            <option value={record.id} selected={movieRecord.category.id === record.id}>{record.categoryName}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="mb-3 col-sm-12">
                                                                        <label className="form-label">Actors</label>
                                                                        <input type="text" className="form-control" name="editReviewTitle" value={movieActors} onChange={(e) => setMovieActors(e.target.value)} placeholder="Separate by a comma (,)" required/>
                                                                    </div>
                                                                </div>
                                                                

                                                                <div className="modal-footer">
                                                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                  <button type="submit" className="btn btn-primary">Save changes</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }

                        </div>

                        {/* Create Movie Modal */}

                        <div className="modal fade" id="createMovie" tabIndex={-1} aria-labelledby="createMovieModal" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create Movie</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <form onSubmit={createMovie}>
                                <div className="modal-body">
                                    <div className="row">
                                      <div className="mb-3 col-sm-12">
                                          <label className="form-label">Movie Title</label>
                                          <input type="text" className="form-control" name="editReviewTitle" value={movieName} onChange={(e) => setMovieName(e.target.value)} required/>
                                      </div>
                                      </div>
                                      <div className="row">
                                          <div className="mb-3 col-sm-12">
                                              <label className="form-label">Movie Plot</label>
                                              <textarea className="form-control" name="editReviewText" id="editReviewText" rows={3} value={moviePlot} onChange={(e) => setMoviePlot(e.target.value)}></textarea>
                                          </div>
                                      </div>
                                    <div className="row">
                                        <div className="mb-3 col-sm-6">
                                            <label className="form-label">Director</label>
                                            <input type="text" className="form-control" name="editReviewTitle" value={movieDirector} onChange={(e) => setMovieDirector(e.target.value)} required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label">Genre</label>
                                                <select className="form-select" value={movieCategory} onChange={(e) => setMovieCategory(e.target.value)}>
                                                        <option value="-1">Select...</option>
                                                    {
                                                        categories && categories.map(record => {
                                                            return(
                                                                <option value={record.id}>{record.categoryName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-sm-12">
                                            <label className="form-label">Actors</label>
                                            <input type="text" className="form-control" name="editReviewTitle" value={movieActors} onChange={(e) => setMovieActors(e.target.value)} placeholder="Separate by a comma (,)" required/>
                                        </div>
                                    </div>
                                </div>
                              
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success"><i className="bi bi-plus-lg"></i> Create Movie</button>
                              </div>

                            </form>
                            </div>
                          </div>
                        </div>

                    </body>

                <Footer />
            </div>
            
        )
    } else if(searchUrlParams.get("reviews") !== null) {
        return (
            <div>
                <Navbar />

                    <body>

                        <div className="container my-5">
                            <a href="/" className="py-2"><i className="bi bi-arrow-90deg-up"></i> Home</a>
                            <h3 key={loggedAccount?.id}>Hey, {loggedAccount?.firstName}!</h3>
                                <p>Welcome to your personal area.</p>
                        </div>

                        <div className="container mt-3">
                            <ul className="nav nav-tabs">
                              <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/dashboard?profile">Profile</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="/dashboard?movies">My Movies</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link active" href="/dashboard?reviews">My Reviews</a>
                              </li>
                            </ul>
                        </div>
                        <Alerts />

                        <div className="container my-5">
                        <h3 className="my-3">My Reviews</h3>
                            {
                                myReviews.map (record => {
                                    return(
                                        <div>
                                            <div className="card ms-5 my-3">
                                                <div className="card-body">
                                                    <div className="float-end">
                                                        <a type="button" className="btn btn-outline-secondary" href={`/movie/${record.movieId}`}>View More</a>
                                                    </div>
                                                <div className="list-inline">
                                                    <h5 className="text-body-secondary list-inline-item">{record.reviewTitle}</h5>
                                                    <span className="badge rounded-pill text-bg-info list-inline-item">{record.movies.movieName}</span>
                                                    {Stars(record.reviewRating)}
                                                </div>
                                                    <p className="float-start text-body-secondary ms-5">{record.reviewText}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </body>

                <Footer />
            </div>
            
        )
    } else {
        navigate("/dashboard?profile");
    }

    return(
        <div></div>
    )

}

export default Profile;
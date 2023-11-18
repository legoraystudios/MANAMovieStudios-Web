import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import TestImg from '../Components/Images/titanic.png';
import Stars from '../Components/Layout/Stars';
import Alerts from '../Components/Layout/Alerts';

interface MovieProperties {
    id: any;
    movieName: string;
    moviePlot: string;
    movieDirector: string;
    movieActors: string;
    overallRating: {
        overallRating: Number;
    }
    reviewsCount: any;
    category: {
        categoryName: string;
    }
    user: {
        username: string;
        firstName: string;
        lastName: string;
    }

}

interface ReviewProperties {
    reviewTitle: string;
    reviewText: string;
    reviewRating: any;
    user: {
        username: string;
        firstName: string;
        lastName: string;
    }
}

interface SubmitReviewProperties {
    reviewTitle: string;
    reviewText: string;
    reviewRating: any;
    movieId: any;
}

function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState<MovieProperties | null>(null);
    const [reviews, setReviews] = useState<ReviewProperties[]>([]);
    const [overallRating, setOverallRating] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loggedUsername = ""

    // Variables for submitReview()
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(1);
    const [movieId, setMovieId] = useState(id);

    const navigate = useNavigate();

    const getMovie = async () => {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (data !== null) {
            const ratingObject = data.overallRating;
            setOverallRating(ratingObject);
            setMovie(data);
        }

    }

    const validateSession = async () => {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/user/session`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }

    const getReviews = async () => {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/reviews/movie/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        setReviews(data);

    }

    const submitReview = async (event: any) => {

        event.preventDefault();

        try {

            const payload = {reviewTitle: reviewTitle, reviewText: reviewText, reviewRating: reviewRating, movieId: movieId};

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/reviews/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                navigate(`/movie/${id}?successCreateReview`);
            } else {
                navigate('/signin?error');
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    useEffect(() => {
        document.title = "Movie | MANAMovieStudios";
        getMovie();
        getReviews();
        validateSession();
    }, [])


    if (movie !== null) {
        return(
            <div>

                <Navbar />

                {movie ? (
                    <>

                    <div className="container mt-5">

                    <Alerts />

                        <a href="/" className="py-2"><i className="bi bi-arrow-90deg-up"></i> Home</a>

                        <div className="list-inline">
                            <h2 key={movie.id} className="list-inline-item mb-5">{movie.movieName}</h2>
                            <span key={movie.id} className="badge rounded-pill text-bg-info">{movie.category.categoryName}</span>
                            <br/>
                        </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={TestImg} alt="" height={350} />

                                </div>
                                
                                <div className="col-sm-8 my-5">
                                    <div className="list-inline">
                                        <h5 className="list-inline-item text-desc">Plot:</h5>
                                        <p className="list-inline-item"> {movie.moviePlot}</p>
                                    </div>
                                    <div className="list-inline">
                                        <h5 className="list-inline-item text-desc">Director:</h5>
                                        <p className="list-inline-item"> {movie.movieDirector}</p>
                                    </div>
                                    <div className="list-inline">
                                        <h5 className="list-inline-item text-desc">Actors:</h5>
                                        <p className="list-inline-item"> {movie.movieActors}</p>
                                    </div>
                                    <div className="list-inline mt-5">
                                        <p className="list-inline-item text-secondary">Published by:</p>
                                        <p className="list-inline-item">{movie.user.firstName} {movie.user.lastName} ({movie.user.username})</p>
                                    </div>
                                </div>
                            </div>

                            { isLoggedIn === true ? (
                        <>

                    <form>
                        <div className="my-5">
                            <h5>Write a Review:</h5>

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>

                        <div>
                            <label className="form-label">Rating</label>
                        </div>
                            <div className="form-check form-check-inline" id="starRating">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="oneStarRating" value="1" checked/>
                                <label className="form-check-label" htmlFor={"oneStarRating"}>
                                    <i className="bi bi-star-fill list-inline-item fs-4"></i>
                                </label>
                            </div>
                            <div className="form-check form-check-inline" id="starRating">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="twoStarRating" value="2" />
                                <label className="form-check-label" htmlFor={"twoStarRating"}>
                                    <i className="bi bi-star-fill list-inline-item fs-4"></i>
                                </label>
                            </div>
                            <div className="form-check form-check-inline" id="starRating">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="threeStarRating" value="3" />
                                <label className="form-check-label" htmlFor={"threeStarRating"}>
                                    <i className="bi bi-star-fill list-inline-item fs-4"></i>
                                </label>
                            </div>
                            <div className="form-check form-check-inline" id="starRating">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="fourStarRating" value="4" />
                                <label className="form-check-label" htmlFor={"fourStarRating"}>
                                    <i className="bi bi-star-fill list-inline-item fs-4"></i>
                                </label>
                            </div>
                            <div className="form-check form-check-inline" id="starRating">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="fiveStarRating" value="5" />
                                <label className="form-check-label" htmlFor={"fiveStarRating"}>
                                    <i className="bi bi-star-fill list-inline-item fs-4"></i>
                                </label>
                            </div>

                            <div className="my-3">
                              <label className="form-label">Comments</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                            </div>

                            <button type="submit" className="btn btn-color text-white">Submit</button>

                        </div>
                    </form>

                        </>
                    ) : (
                    <div className="my-5">
                        <h5>Write a Review:</h5>
                        <div className="list-inline">
                            <a className="list-inline-item" href="/signin">Sign in</a>
                            <p className="list-inline-item">for write a review!</p>
                        </div>
                    </div>
                        
                    )

                    }

                        <div className="my-5">
                            <h5>Reviews ({movie.reviewsCount}):</h5>
                                {Stars(overallRating)}
                        </div>

                    </div>
                    </>
                ) : (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-grow text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )

                }


                {
                    reviews.map( record => {
                        return(
                        <div className="container my-5">
                            <div className="ms-5">
                                <p className="text-secondary"><i className="bi bi-person-fill"></i> {record.user.firstName} {record.user.lastName} ({record.user.username})</p>
                            </div>
    
                            <div className="card ms-5">
                                <div className="card-body">

                                {record.user.username === loggedUsername ? (
                                    <div className="float-end">
                                        <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                ) : (
                                    <div></div>
                                )

                                }

                                    <h5 className="text-body-secondary mt-1">{record.reviewTitle} | {Stars(record.reviewRating)}</h5>
                                    <p className="float-start text-body-secondary ms-5">{record.reviewText}</p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
    

                <Footer />
    
            </div>
        )
    } else {
        return(
            <div>
    
                <Navbar />
    
                <div className="container mt-5 text-center">

                    <h1 className="text-danger">404 | Not Found</h1>
                    <p>Hmmm... It seems that the movie that you're looking for has not come out.</p>
                    <a href="/">Back to home</a>

                </div>
                
    
            </div>
        )
    }



}

export default Movie;
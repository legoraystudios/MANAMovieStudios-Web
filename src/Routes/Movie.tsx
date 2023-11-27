import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import Poster from '../Components/Images/poster.png';
import Stars from '../Components/Layout/Stars';
import Alerts from '../Components/Layout/Alerts';
import 'bootstrap/dist/js/bootstrap.js';

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
    id: any;
    reviewTitle: string;
    reviewText: string;
    reviewRating: any;
    user: {
        username: string;
        firstName: string;
        lastName: string;
    }
}

function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState<MovieProperties | null>(null);
    const [reviews, setReviews] = useState<ReviewProperties[]>([]);
    const [overallRating, setOverallRating] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUsername, setLoggedUsername] =useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // Variables for submitReview()
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(1);
    const [movieId] = useState(id);

    // Variables for editReview()
    const [reviewId, setReviewId] = useState("");
    const [editReviewTitle, setEditReviewTitle] = useState("");
    const [editReviewText, setEditReviewText] = useState("");
    const [editReviewRating, setEditReviewRating] = useState(1);

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

        setIsLoaded(true);

    }

    const validateSession = async () => {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/user/session`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (response.status === 200) {
            setIsLoggedIn(true);
            setLoggedUsername(data.username);
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
                window.location.reload();
            } else {
                navigate(`/movie/${id}?error`);
                window.location.reload();
            }

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    const deleteReview = async (reviewId: any) => {
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/reviews/${reviewId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            navigate(`/movie/${id}?successDeletedReview`);
            window.location.reload();
        } else {
            navigate(`/movie/${id}?error`);
            window.location.reload();
        }

    }

    const editReview = async (event: any) => {

        event.preventDefault();

        const payload = {reviewTitle: editReviewTitle, reviewRating: editReviewRating, reviewText: editReviewText};
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/reviews/${reviewId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (response.status === 200) {
            navigate(`/movie/${id}?successEditedReview`);
            window.location.reload();
        } else {
            navigate(`/movie/${id}?error`);
            window.location.reload();
        }

    }

    useEffect(() => {
        document.title = "Movie | MANAMovieStudios";
        getMovie();
        getReviews();
        validateSession();
    }, [])

        return(
            <div>
                
                <Navbar />

                {!isLoaded ? (
                    <>
                    <div className="containter mt-5">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-grow" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                    {movie !== null ? (
                    <>

                    <div className="container mt-5">

                    <Alerts />

                        <a href={`${process.env.REACT_APP_BASENAME}/`} className="py-2"><i className="bi bi-arrow-90deg-up"></i> Home</a>

                        <div className="list-inline">
                            <h2 key={movie.id} className="list-inline-item mb-5">{movie.movieName}</h2>
                            <span key={movie.id} className="badge rounded-pill text-bg-info">{movie.category.categoryName}</span>
                            <br/>
                        </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={Poster} alt="" height={350} />

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

                                    <form onSubmit={submitReview}>
                                        <div className="my-5">
                                            <h5>Write a Review:</h5>

                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" placeholder="" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} required/>
                                        </div>

                                        <div>
                                            <label className="form-label">Rating</label>
                                        </div>

                                        <input type="radio" className="btn-check" name="options-base" id="option1" value="1" onChange={(e: any) => setReviewRating(parseInt(e.target.value))} />
                                        <label className="btn btn-outline-warning" htmlFor="option1"><i className="bi bi-star-fill list-inline-item"></i></label>

                                        <input type="radio" className="btn-check" name="options-base" id="option2" value="2" onChange={(e: any) => setReviewRating(parseInt(e.target.value))} />
                                        <label className="btn btn-outline-warning" htmlFor="option2"><i className="bi bi-star-fill list-inline-item"></i></label>

                                        <input type="radio" className="btn-check" name="options-base" id="option3" value="3" onChange={(e: any) => setReviewRating(parseInt(e.target.value))} />
                                        <label className="btn btn-outline-warning" htmlFor="option3"><i className="bi bi-star-fill list-inline-item"></i></label>

                                        <input type="radio" className="btn-check" name="options-base" id="option4" value="4" onChange={(e: any) => setReviewRating(parseInt(e.target.value))} />
                                        <label className="btn btn-outline-warning" htmlFor="option4"><i className="bi bi-star-fill list-inline-item"></i></label>

                                        <input type="radio" className="btn-check" name="options-base" id="option5" value="5" onChange={(e: any) => setReviewRating(parseInt(e.target.value))} />
                                        <label className="btn btn-outline-warning" htmlFor="option5"><i className="bi bi-star-fill list-inline-item"></i></label>

                                            <div className="my-3">
                                              <label className="form-label">Comments</label>
                                              <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                                              value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                                            </div>

                                            <button type="submit" className="btn btn-color">Create Review</button>

                                        </div>
                                    </form>

                                </>
                                ) : (
                                    <div className="my-5">
                                        <h5>Write a Review:</h5>
                                        <div className="list-inline">
                                            <a className="list-inline-item" href={`${process.env.REACT_APP_BASENAME}/signin`}>Sign in</a>
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
                    <div className="container mt-5 text-center">
                        <h1 className="text-danger">404 | Not Found</h1>
                        <p>Hmmm... It seems that the movie that you're looking for has not come out.</p>
                        <a href={`${process.env.REACT_APP_BASENAME}/`}>Back to home</a>                              
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
                                <div>
                                    <div className="float-end">
                                        <button type="button" className="btn btn-outline-primary mx-1" data-bs-toggle="modal" data-bs-target={`#editReview-${record.id}`} onClick={
                                            () => {
                                                setEditReviewTitle(record.reviewTitle);
                                                setEditReviewRating(record.reviewRating);
                                                setEditReviewText(record.reviewText);
                                                setReviewId(record.id);
                                            }

                                        }><i className="bi bi-pencil-fill"></i></button>
                                        <button type="button" className="btn btn-outline-danger" onClick={(e) => deleteReview(record.id)}><i className="bi bi-trash-fill"></i></button>
                                    </div>

                                    {/* Edit Review Modal */}

                                    <div className="modal fade" id={`editReview-${record.id}`} tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Review</h1>
                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                                <div className="modal-body">
                                                    <form onSubmit={editReview}>
                                                        <div className="mb-3">
                                                            <label className="form-label">Title</label>
                                                            <input type="text" className="form-control" name="editReviewTitle" value={editReviewTitle} onChange={(e) => setEditReviewTitle(e.target.value)} required/>
                                                        </div>

                                                        <div>
                                                            <label className="form-label">Rating</label>
                                                        </div>
                                                        <input type="radio" className="btn-check" name="editoptions-base" id="option6" value={1} onChange={(e: any) => setEditReviewRating(parseInt(e.target.value))}/>
                                                        <label className="btn btn-outline-warning" htmlFor="option6"><i className="bi bi-star-fill list-inline-item"></i></label>

                                                        <input type="radio" className="btn-check" name="editoptions-base" id="option7" value={2} onChange={(e: any) => setEditReviewRating(parseInt(e.target.value))}/>
                                                        <label className="btn btn-outline-warning" htmlFor="option7"><i className="bi bi-star-fill list-inline-item"></i></label>

                                                        <input type="radio" className="btn-check" name="editoptions-base" id="option8" value={3} onChange={(e: any) => setEditReviewRating(parseInt(e.target.value))}/>
                                                        <label className="btn btn-outline-warning" htmlFor="option8"><i className="bi bi-star-fill list-inline-item"></i></label>

                                                        <input type="radio" className="btn-check" name="editoptions-base" id="option9" value={4} onChange={(e: any) => setEditReviewRating(parseInt(e.target.value))}/>
                                                        <label className="btn btn-outline-warning" htmlFor="option9"><i className="bi bi-star-fill list-inline-item"></i></label>

                                                        <input type="radio" className="btn-check" name="editoptions-base" id="option10" value={5} onChange={(e: any) => setEditReviewRating(parseInt(e.target.value))}/>
                                                        <label className="btn btn-outline-warning" htmlFor="option10"><i className="bi bi-star-fill list-inline-item"></i></label>

                                                            <div className="my-3">
                                                              <label className="form-label">Comments</label>
                                                              <textarea className="form-control" name="editReviewText" id="editReviewText" rows={3}
                                                              value={editReviewText} onChange={(e) => setEditReviewText(e.target.value)}></textarea>
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

                                ) : (
                                    <></>
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
                    </>
                )}
    

                <Footer />
    
            </div>
        )



}

export default Movie;
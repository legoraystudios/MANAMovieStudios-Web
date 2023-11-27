import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import Poster from '../Components/Images/poster.png';
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
}

function Category() {

    const { id } = useParams();
    const [movies, setMovies] = useState<MovieProperties[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();

    const fetchMovies = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/category/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();
            setMovies(data);
            setIsLoaded(true);

                {

                    if(data.length === 0) {
                            document.title = `Not Found | MANAMovieStudios`;
                    } else {
                        setCategoryName(data[0].category.categoryName)
                        data && data.map((record: { category: { categoryName: any[]; }; })  => {
                            document.title = `${record.category.categoryName} | MANAMovieStudios`;
                        })
                    }
                }   
                

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }

    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return(
        <div>

            <Navbar />

            <body>

        {!isLoaded ? (
            <>
            <div className="container my-5">
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
            </div>
            </>
        ) : (
            <>
                {
                    movies.length > 0 ? (
                        <>
                            <div className="container my-5 list-inline">
                                <h2 className="list-inline-item align-middle">{categoryName}</h2>
                                <span className="list-inline-item align-middle">({movies.length} Entries found)</span>
                                <Alerts />
                            </div>

                    {
                            movies && movies.map( record => {
                                return(
                                <div className="container pt-4 border-top">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <a href={`${process.env.REACT_APP_BASENAME}/movie/${record.id}`}>
                                                <img src={Poster} alt="" height={150} />
                                            </a>
                                
                                        </div>
                                        <div className="col-sm-8 list-inline">
                                            <h5 className="list-inline-item"><a href={`${process.env.REACT_APP_BASENAME}/movie/${record.id}`} className="text-decoration-none text-secondary">{record.movieName}</a></h5>
                                            <span key={record.id} className="badge rounded-pill text-bg-info list-inline-item">{record.category.categoryName}</span>
                                            <p>{record.moviePlot}</p>
                                            <span>Reviews ({record.reviewsCount}):</span>
                                                {Stars(record.overallRating)}
                                        </div>
                                        <div className="border-bottom pb-4"></div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </>
                    ) : (
                        <>

                            <div className="container mt-5 text-center">

                                <h1 className="text-danger">404 | Not Found</h1>
                                <p>Hmmm... It seems that we don't have any movies for that category.</p>
                                <a href={`${process.env.REACT_APP_BASENAME}/`}>Back to home</a>

                            </div>

                        </>
                    )
                    
                }
            </>
        )}

            </body>

            <Footer/>

        </div>
    )
}

export default Category;
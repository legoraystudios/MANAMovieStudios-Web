import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../Components/Layout/Alerts';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import TestImg from '../Components/Images/titanic.png';
import Stars from '../Components/Layout/Stars';

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

function Home() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState<MovieProperties[]>([]);
    const [overallRating, setOverallRating] = useState(0);

    const fetchMovies = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/movies/`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();
            setMovies(data);

        } catch (err) {
            navigate("?errorApiConn")
            console.log(err);
        }
        



    }

    useEffect(() => {
        document.title = "Home | MANAMovieStudios";
        fetchMovies();
    }, []);

    return(
        <div>

            <Navbar />

            <body>
                <div className="container my-5 list-inline">
                    <h2 className="list-inline-item align-middle">Top 10 Movies</h2>
                    <span className="list-inline-item align-middle">(based in user's reviews)</span>
                    <Alerts />
                </div>

                
                
                {
                    movies && movies.map( record => {
                        return(
                        <div className="container pt-4 border-top">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={TestImg} alt="" height={150} />
        
                                </div>
                                <div className="col-sm-8 list-inline">
                                    <h5 className="list-inline-item"><a href={`/movie/${record.id}`} className="text-decoration-none text-secondary">{record.movieName}</a></h5>
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

                <Footer />

            </body>
            
        </div>
    )

}

export default Home;
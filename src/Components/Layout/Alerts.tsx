

function Alerts(): JSX.Element {

    const queryParams = new URLSearchParams(window.location.search);

    if(queryParams.has("errorApiConn")) {
        return (
            <div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    System | An error has occured while contacting to the server. Please try again later.<br />
                    For System Administrators: Please check <a href="https://github.com/legoraystudios/MANAMovieStudios-Core" target="_blank" className="alert-link">https://github.com/legoraystudios/MANAMovieStudios </a> 
                     to learn how to configure your API Server.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    } else if(queryParams.has("signInError")) {
        return (
            <div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    System | Username or password are incorrect.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    } else if(queryParams.has("successLoggedOut")) {
        return (
            <div>
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    System | Logged out successfully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    } else if(queryParams.has("error")) {
        return (
            <div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    System | An error has occured when performing this action. Please try again later.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    } else if(queryParams.has("successCreateReview")) {
        return (
            <div>
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    System | Review creates successfully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    } else {
        return(
            <div></div>
        )
    }

}

export default Alerts;
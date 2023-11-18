
function Stars(overallRating: any) {

        let floatRating = overallRating;

        const rating : any[] = [];
        
        if (floatRating == 0 && floatRating <= 0.4) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 0.5 && floatRating <= 0.9) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-half list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 1.0 && floatRating <= 1.4) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 1.5 && floatRating <= 1.9) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-half list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 2.0 && floatRating <= 2.4) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 2.5 && floatRating <= 2.9) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-half list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 3.0 && floatRating <= 3.4) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 3.5 && floatRating <= 3.9) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-half list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 4.0 && floatRating <= 4.4) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 4.5 && floatRating <= 4.9) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-half list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        } else if (floatRating == 5.0) {
            rating.push(
                <div className="list-inline text-warning">
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <i className="bi bi-star-fill list-inline-item"></i>
                    <h5 className="text-black list-inline-item">{floatRating}</h5>
                </div>
            )
        }

        return rating;

}

export default Stars;
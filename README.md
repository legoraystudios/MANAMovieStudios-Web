
# MANAMovieStudios-Web

A NodeJS/React Movie Database to display movie general information, categories, and leave reviews.

![App Screenshot](https://legoray.com/assets/images/MANAMovieStudios-screenshot.png)

I've been created this project for a class in my University. This project intends to reflect knowledge about RESTful API's and the Create, Read, Update and Delete (CRUD) operations in a database.
## Prerequisites

*   You need to have installed MANAMovieStudios-Core in your Server as a RESTful API Server. You can clone the repository [here](https://github.com/legoraystudios/MANAMovieStudios-Core).
*   NodeJS 18.14 or later installed in your system.
## Installation

1. Download [here](https://github.com/legoraystudios/MANAMovieStudios-Web.git) or clone it in a empty folder with the following command (Requires Git)

```bash
git clone https://github.com/legoraystudios/MANAMovieStudios-Web.git
```

2. Extract all the files on the folder if there's on a `.zip` file.

3. Open the `.env` file on the project and replace `REACT_APP_BACKEND_HOST` with your actual RESTful API URL.

```js
REACT_APP_BACKEND_HOST="http://localhost:8080"
```
(This is necessary due avoid issues with the CORS Policy and Headers).

4. Run `npm install` to install all the dependencies in the package.json.

5. When the dependencies are installed, run `npm start` to start a project in a development build, or `npm run build` for a production build.
    
## Dependencies

For this project, I used the following dependencies:

*   [Bootstrap](https://getbootstrap.com/)
*   react-router-dom
*   [react-datepicker](https://reactdatepicker.com/)
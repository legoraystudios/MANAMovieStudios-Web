
# MANAMovieStudios-Web

A NodeJS/React Movie Database to display movie general information, categories, and leave reviews.

![App Screenshot](https://legoray.com/assets/images/MANAMovieStudios-screenshot.png)

I have been creating this project for a class at my University. This project aims to reflect my knowledge about RESTful API's and Create, Read, Update and Delete (CRUD) operations in a database.
## Prerequisites

*   You need to have installed MANAMovieStudios-Core in your Server as a RESTful API Server. You can clone the repository [here](https://github.com/legoraystudios/MANAMovieStudios-Core).
*   NodeJS 18.14 or later installed in your system.
## Installation

1. Download [here](https://github.com/legoraystudios/MANAMovieStudios-Web) or clone it in a empty folder with the following command (Requires Git)

```bash
git clone https://github.com/legoraystudios/MANAMovieStudios-Web.git
```

2. Extract all the files on the folder, if present, into a `.zip` file.

3. Open the `.env` file on the project and replace `REACT_APP_BACKEND_HOST` with your actual RESTful API URL.

```js
REACT_APP_BACKEND_HOST="http://localhost:8080"
```
(This is necessary to avoid issues with CORS Policy and Headers).

4. Run `npm install` to install all the dependencies in package.json.

5. When dependencies are installed, run `npm start` to start a project in a development build, or `npm run build` for a production build.
    
## Dependencies

For this project, I used the following dependencies:

*   [Bootstrap](https://getbootstrap.com/)
*   react-router-dom
*   [react-datepicker](https://reactdatepicker.com/)
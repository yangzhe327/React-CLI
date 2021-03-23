const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();


var webpack = require('webpack');
var config = require('./config/webpack-dev.config.js');
var compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get('/', (req, res) => {
    res.redirect("http://localhost:8000")
})

// Serve the files on port 8000.
app.listen(8000, function () {
    console.log('Example app listening on port 8000!\n');
});
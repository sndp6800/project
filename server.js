const express = require('express');
const path = require('path');
const app = express();
// Keep this directory aligned with angular.json -> projects.ca-webpage.architect.build.options.outputPath.
const outputDirectory = path.join(__dirname, 'dist', 'ca-webpage');
app.use(express.static(outputDirectory));
app.get('*', (req, res) => res.sendFile(path.join(outputDirectory, 'index.html')));
app.listen(process.env.PORT || 8080);

const express = require('express');
const apiRoutes = require ("./routes/apiRoutes");
const htmlRoutes = require ("./routes/htmlRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use (express.json ());
app.use(express.urlencoded({
    extended : true
}));
app.use(express.static('public')); //apends public //

app.use('/api',apiRoutes);
app.use("/",htmlRoutes);

app.listen(PORT, () => {
    allNotes = gatherNotes();
    console.log(`API server now on port ${PORT}!`);
});
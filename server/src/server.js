const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {MongoClient} = require('mongodb');

app.use(bodyParser.json());

app.get('/api/articles/:name', async (req, res) => {

    try {

        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
    
        const db = client.db("Blog-Website-using-MERN");
        const articleInfo = await db.collection('articles').findOne({name : articleName});
        res.status(200).json(articleInfo);
        client.close();
    } catch(error) {
        res.status(500).json({message: 'Error connecting to database', error});
    }

});

app.post('/api/articles/:name/add-comments', (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;

    articleInfo[articleName].comments.push({username,text});
    res.status(200).send(articleInfo[articleName]);
});

app.listen(9000, () => console.log("Server running on PORT 9000"));
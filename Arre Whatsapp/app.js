import * as express from 'express';
const app = express();
const messages = [];

app.get('/chats', (req, res) => {
    const page = 1 || req.query.page;
    const max = 8 || req.query.max;
    const beginPage = (page - 1) * max;
    const endPage = page * max;
    res.json(messages.slice(beginPage, endPage))
})

app.post('/chats', (req, res) => {
    messages.push(req.body)
    res.json({ message: 'Sent' })
})

app.listen(3000, () => {
    console.log('Server is running on the port 3000')
});

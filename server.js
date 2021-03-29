const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodeParser = require('body-parser')
const app = express()

app.use(bodeParser.json())
app.use(bodeParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost/Tweeter", { useNewUrlParser: true, useUnifiedTopology: true })

const tweetSchema = new Schema({
  text: String
})
const Tweet = mongoose.model('Tweet', tweetSchema)

app.get('/tweets', async function (req, res) {
  const tweets = await Tweet.find({})
  res.send(tweets)
})

app.post('/tweets', async function (req, res) {
  const tweet = new Tweet(req.body)
  await tweet.save()
  res.send(tweet)
})
const port = 3000
app.listen(port, function () {
  console.log(`running on port ${port}`)
})
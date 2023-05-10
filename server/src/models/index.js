// include all of your models here using CommonJS requires
const User = require("./User.js")
const Website = require("./Website.js")
const Comment = require("./Comment.js")
const Vote = require("./Vote.js")

module.exports = {User, Website, Vote, Comment};
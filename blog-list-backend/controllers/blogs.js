const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const populated = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  response.json(populated)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
    comments: []
  })
  const result = await newBlog.save()
  const populated = await result.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(populated._id)
  await user.save()
  response.status(201).json(populated)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const newComment = new Comment(body)
  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  const updatedBlogPost = await blog.save()
  const populatedWithUser = await updatedBlogPost.populate('user', { username: 1, name: 1 })
  const populated =  await populatedWithUser.populate('comments', { content: 1 })
  response.json(populated)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (user.id.toString() === blog.user.toString()) {
    await Blog.deleteOne({ _id: blog.id })
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'user not authorized to delete blog post' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user, comments } = request.body
  const commentIds = comments.map(comment => comment.id)
  const updatedBlogPost = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user: user.id, comments: commentIds },
    { new: true, runValidators: true }
  )
  const populatedWithUser = await Blog.findById(updatedBlogPost._id).populate('user', { username: 1, name: 1 })
  const populated =  await populatedWithUser.populate('comments', { content: 1 })
  response.json(populated)
})

module.exports = blogsRouter
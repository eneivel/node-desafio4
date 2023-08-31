require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { getPosts, createPost, updatePost, deletePost } = require('./queries')

const port = process.env.PORT || 3001
app.listen(port, console.log(`Server running on http://localhost:${port}`))

// Middlewares
app.use(cors())
app.use(express.json())

// Obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Crear un nuevo post
app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body
    await createPost(titulo, img, descripcion, likes)
    res.status(201).json({ message: 'Post creado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

})

// Actualizar el número de likes de un post
app.put('/posts/like/:id', async (req, res) => {
  try {

    const { id } = req.params
    const post = await updatePost(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Eliminar un post
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await deletePost(id)

    if (!post) return res.status(404).json({ message: 'Post no encontrado' })

    res.status(200).json({ message: 'Post eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



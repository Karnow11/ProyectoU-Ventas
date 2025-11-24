import { Router } from 'express'
import User from '../models/user'
import PostModel from '../models/posts'

const router = Router()

// POST /api/testing/reset
router.post('/reset', async (req, res) => {
  try {
    await User.deleteMany({})
    await PostModel.deleteMany({})
    return res.status(204).end()
  } catch (error) {
    return res.status(500).json({ error: 'reset failed' })
  }
})

export default router
import express from 'express'
import cors from 'cors'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'
import { ApiError } from './helper/apiError.js'

const port = process.env.PORT


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', todoRouter)
app.use('/user', userRouter)


app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status || 500).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})


app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`)
})
import { pool } from '../helper/db.js'
import { auth } from '../helper/auth.js'
import { Router } from 'express'
import { getTasks, postTask, deleteTaskById } from '../controllers/TaskController.js'

const router = Router()

router.get("/", getTasks)

router.post('/create', auth, postTask)
router.delete('/delete/:id', auth, deleteTaskById)

export default router
/*
router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(result.rows || [])
    })
})


router.post('/create', auth, (req, res, next) => {
    const { task } = req.body
    if (!task) {
        return res.status(400).json({ error: 'Task is required' })
    }

    pool.query(
        'INSERT INTO task (description) VALUES ($1) RETURNING *',
        [task.description],
        (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({ id: result.rows[0].id, description: task.description })
        }
    )
})


router.delete('/delete/:id', auth, (req, res, next) => {
    const { id } = req.params
    pool.query('DELETE FROM task WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err)
        }
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.status(200).json({ id })
    })
})

export default router
*/
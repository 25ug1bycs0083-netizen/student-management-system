import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => res.json({ status: 'ok', service: 'student-management-api' }));
export default router;

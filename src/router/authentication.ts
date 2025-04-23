const express = require('express');
const { register } = require('../controller/authentication');

const router = express.Router();

router.post('/auth/register', register); // Register route

export default router;
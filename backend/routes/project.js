const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');
const middleware = require('../middleware/auth');

router.post('/add-project' , middleware.authentication, projectController.postProject );

router.post('/:pageno' , middleware.authentication,  projectController.getProjects)

router.delete('/delete-project/:projectid', middleware.authentication, projectController.deleteProject )


module.exports = router ;

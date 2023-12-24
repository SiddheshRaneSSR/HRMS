const express=require('express');
const router=express.Router();
const { UserCreate } = require("../controllers/user/UserCreate");
const { user_login } = require('../controllers/user/Userlogin');
const { userLogout } = require('../controllers/user/UserLogout');
const check_user_auth = require('../middlewares/auth_middleware.js');
const { newTask } = require('../controllers/task/newTask.js');
const { taskdetails } = require('../controllers/task/taskDetails.js');
const { gettask } = require('../controllers/task/gettask.js');
const { PostAddProject } = require('../controllers/project/AddProject.js');
const { PostAddProjectTask } = require('../controllers/project/PostAddProjectTask.js');
const { PutProjectDetails } = require('../controllers/project/ProjectDetails.js');
const { GetProjects } = require('../controllers/project/Getprojects.js');
const { DeleteProject } = require('../controllers/project/DeleteProject.js');


router.post("/userregister",UserCreate);
router.post("/userlogin",user_login);
router.post("/userlogout",userLogout);

router.post("/newTask",authenticateUser,newTask);
router.post("/taskDetails",authenticateUser,taskdetails);
router.get("/gettask/:param*",authenticateUser,gettask);
router.delete('/deleteTask/:id',authenticateUser, deleteTask); 



router.post('/addproject',authenticateUser,PostAddProject);
router.post('/addprojecttask',authenticateUser,PostAddProjectTask);
router.put('/projectdetails',authenticateUser,PutProjectDetails);
router.get('/getprojects/:param*',authenticateUser,GetProjects);
router.delete('/deleteproject',authenticateUser,DeleteProject)


module.exports=router;
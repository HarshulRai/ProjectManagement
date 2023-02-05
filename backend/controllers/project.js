const Project = require('../models/project');
const User = require('../models/user')

exports.postProject  =  async (req,res,next)=>{
    const {projectname, description, status} = req.body ;
    try {
        if(!projectname || !description || !status){
            return res.status(400).json({message:'add all fields'})
        }
        const data = await Project.create({projectname, description, status , userId:req.user._id})
        res.status(201).json({data ,  message:'sucessfully added project'})
    } catch (error) {
        res.status(500).json({message:'unable to add project'})
    }
}

// let limit_items  ;

exports.getProjects = async(req,res,next)=>{

    let page = req.params.pageno || 1
    let limit_items = +(req.body.itemsPerPage) || 5 ;
    // console.log(+(req.body.itemsPerPage))
    let totalItems 

    try {
        let count = await Project.find().count()
        totalItems = count ; 

        let data = await Project.find({userId: req.user.id}).skip((page-1)*limit_items).limit(limit_items)

        res.status(200).json({data ,
            info: {
              currentPage: page,
              hasNextPage: totalItems > page * limit_items,
              hasPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              lastPage: Math.ceil(totalItems / limit_items),
            }})
    } catch (error) {
        res.status(500).json({message:'unable to get project'})
    }
    
}

exports.deleteProject = async(req,res,next)=>{
    try {
        const projectId = req.params.projectid ;
        let project = await Expense.findById(projectId)
        // console.log(expense)
        if(!project){
            return res.status(404).json({message:'project not found'})
        }
        if(project.userId.toString() !== req.user._id.toString()){
            return res.status(401).json("Not Allowed");
        }
        await Project.findByIdAndRemove(projectId)
        res.status(200).json({message:'deleted sucessfully'})
        
    } catch (error) {
        res.status(500).json({message:'unable to delete project'})
    }
}


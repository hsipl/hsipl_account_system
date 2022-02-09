const db = require('../models')
const User = db.User



exports.create = (req, res) =>{
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        money: req.body.money
    }

    User.create(user).then(data =>{
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message: err
        })
    })

}

// exports.findAll = (req, res) =>{
//     const 

// }

exports.findOne = (req, res) =>{
    const id = req.params.id
    User.findByPk(id)
    .then(data =>{
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({
                message:"Cannot find one"
            })
        }
        
    })
    .catch(err =>{
        res.status(500).send({
            message: "ERROR"
        })
    })

}

exports.update = (req, res) =>{
    const id = req.params.id

    User.update(req.body,{
        where: {id: id}
    })
    .then(num =>{
        if (num ==1){
            res.send({
                message:"Update sucessfully"
            })
        }
        else{
            res.send({
                message:"Update failed"
            })
        }
    }).catch(err =>{
        res.status().send({
            message: err
        })
    })
}

exports.delete = (req, res) =>{
    const id = req.params.id

    User.destroy({
        where: {id: id}
    }).then(num =>{
        if (num ==1){
            res.send({
                message:"delete sucessfully"
            })
        }
        else{
            res.send({
                message:"Update failed"
            })
        }
    }).catch(err =>{
        res.status().send({
            message: err
        })
    })
    
}

exports.deleteAll = (req, res) =>{
    User.destroy({
        where: {},
        truncate: false
    }).then(nums =>{
        res.send({
            message:"deleteAll sucessfully"
        })
    }).catch(err =>{
        res.status().send({
            message: err
        })
    })
}


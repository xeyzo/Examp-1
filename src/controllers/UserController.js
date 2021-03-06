const models = require("../models")
const bcrypt = require("bcrypt")

const response = {
    message: "Your Message",
    status: "",
    data: [],
  };

class UserController {
    static async create(req, res) {
        try {
            const salt =  bcrypt.genSaltSync(10)
            const data =  await models.User.findOne({ where: { username: req.body.username } })
            if (data == null) {
                const hashPassword = bcrypt.hashSync(req.body.password, salt)
                const user = await models.User.create({
                    username: req.body.username,
                    password: hashPassword,
                    email: req.body.email,
                    fullname: req.body.fullname,
                    phonenumber: req.body.phonenumber,
                    role: req.body.role
                })
                response.message = "New User Created"
                response.status = "Success"
                response.data = {
                    username: user.dataValues.username
                }
                res.status(201).json(response)
            } else {
                throw new Error("Username has been taken")
            }
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            response.data = null
            res.status(400).json(response)
        }
    }

    static async read(req, res) {
        try {
            const data = await models.User.findAll({ attributes: ["username", "email", "fullname","phonenumber","role"],
            });
            response.data = data
            response.message = "Data is successfully retrieved"
            response.status = "Success"
            response.user = req.user;
            res.status(200).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }


    static async find(req, res) {
        const { id } = req.params;
        const userdetail = await models.User.findByPk(id);
        try {
          if (!userdetail) throw new Error("User not found");
          response.data = userdetail;
          response.status = "success";
          res.json(response);
        } catch (error) {
          response.message = error.message;
          response.data = {};
          response.status = "fail";
          res.status(404).json(response);
        }
    }

    static async update(req, res) {
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("User not found")
            }
            const data = await models.User.findByPk(req.userId)
            await models.User.update(req.body, {
                where: {
                    id: req.userId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    username: data.dataValues.username,
                    email: data.dataValues.email,
                    fullname: data.dataValues.fullname,
                    phonenumber: data.dataValues.phonenumber
                }
            }
            response.message = "Data is successfully updated";
            response.status = "Success"

            res.status(201).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async delete(req, res) {
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("You are not the user")
            }
            const data = await models.User.findByPk(req.userId)
            await models.User.destroy({
                where: {
                    id: req.user.id,
                }   
            })
            response.data = null
            response.message = `${data.dataValues.username} is successfully deleted`
            response.status = "Success"
        
            res.status(201).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
}

module.exports = UserController;
const models = require("../models")
const bcrypt = require("bcrypt")

const response = {
    message: "Your Message",
    status: "",
    data: [],
  };

class ProductController {
    static async save(req, res) {
        const { body } = req;
    
        try {
          const save = await models.Product.create({
            name: body.name,
            stock : body.stock,
            price : body.price,
            userId: body.userId
          });
          response.data=save;
          response.message = "sukses simpan data";
          res.status(201).json(response);
        } catch (error) {
          response.status = false;
          response.message = error.message;
          res.status(400).json(response);
        }
      }


    static async read(req, res) {
        try {
            const data = await models.Product.findAll({ attributes: ["name", "stock", "price","userId"],
            });
            response.data = data
            response.message = "Data is successfully retrieved"
            response.status = "Success"
            res.status(200).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }


    static async find(req, res) {
        const { id } = req.params;
        const product = await models.Product.findOne({
            where: { id: id },
            include: [
                { model: User, as: 'user' },
            ]
        });
        try {
            if (!product) throw new Error("Product not found");
            response.data = product;
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
            if (req.params.id != req.productId) {
                return res.status(401).json("User not found")
            }
            const data = await models.Product.findByPk(req.userId)
            await models.Product.update(req.body, {
                where: {
                    id: req.productId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    username: data.dataValues.name,
                    email: data.dataValues.stock,
                    fullname: data.dataValues.price                
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
        const { id } = req.params;
        const delProduct = await models.Product.destroy({ 
            where: {
                id: id
            }
        });

        try {
            if (delProduct) {
            response.message = "Delete succes";
            res.status(200).json(response);
        }
        } catch (err) {
            response.status = "Data tidak ada";
            response.message = err.message;
            res.status(400).json(response);
    }
 }
}

module.exports = ProductController;
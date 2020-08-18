const models = require("../models")

const response = {
    message: "Your Message",
    status: "",
    data: [],
  };

class ProductOutController {
    static async save(req, res) {
        const { body } = req;
    
        try {
          const save = await models.ProductOut.create({
            date: body.date,
            total : body.total,
            productId: body.userId
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
            const data = await models.ProductIn.findAll({ attributes: ["date", "total", "poductId"],
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
        const product = await models.ProductOut.findOne({
            where: { id: id },
            include: [
                { model: Product, as: 'product' },
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
            if (req.params.id != req.productOutId) {
                return res.status(401).json("User not found")
            }
            const data = await models.ProductOut.findByPk(req.userId)
            await models.ProductOut.update(req.body, {
                where: {
                    id: req.productOutId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    date: data.dataValues.date,
                    total: data.dataValues.total,
                    productId: data.dataValues.productId                
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
        const delProduct = await models.ProductOut.destroy({ 
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

module.exports = ProductOutController;
const ProductService = require('../service/ProductService')


const createProduct = async (req, res) => {
    try{
        const {name, image, type, price, countInStock} = req.body 
        if(!name || !image || !type || !price || !countInStock)
            return res.status(200).json({
                status: 'ERROR',
                massage: 'data input invalid',
            })
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message : e
        })
    }
}

const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Can not get product ID'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message : e
        })
    }
}

const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Can not get product ID'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message : e
        })
    }
}

const getAllProduct = async (req, res) => {
    try{
        const {page , limit, sort, filter} = req.query
        const response = await ProductService.getAllProduct(Number(page) || 0 , Number(limit), sort, filter)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message : e
        })
    }
}

const getProductById = async (req, res) => {
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Can not get product ID'
            })
        }
        const response = await ProductService.getProductById(productId)
        return res.status(200).json(response)
    }
    catch (e){
        return res.status(404).json({
            message : e
        })
    }
}

// const getProductByType = async (req, res) => {
//     try{
//         const productType = req.params.type.toLowerCase()
//         console.log(productType)
//         if(!productType){
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'Can not get product Type'
//             })
//         }
//         const response = await ProductService.getProductByType(productType)
//         return res.status(200).json(response)
//     }
//     catch (e){
//         return res.status(404).json({
//             message : e
//         })
//     }
// }

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports ={
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    getAllType,
    deleteMany 
}
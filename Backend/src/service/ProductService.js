const User = require("../models/UserModel")
const Product = require('../models/ProductModel')

const createProduct = (newProduct) =>{
    return new Promise( async (resolve, reject) =>{
        try{         
            const {name, image, type, size, color, price, countInStock, rating, description} = newProduct 
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Product is already exist'
                })
            }
            
            const createdProduct = await Product.create({
                name, image, type, size, color, price, countInStock, rating, description
                })

            resolve({
                status: 'OK',
                massage: 'Product created',
                data : createdProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id, data) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            const updatedProduct = await Product.findOneAndUpdate(checkProduct._id, data, {new :true})
            resolve({
                status: 'OK',
                massage: 'Update product success',
                data: updatedProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            checkProduct.type = checkProduct.type.toLowerCase()
            const deletedProduct = await Product.findOneAndDelete(checkProduct._id)
            resolve({
                status: 'OK',
                massage: 'product is deleted',
                data: deletedProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const getAllProduct = (page, limit, sort, filter) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const objectFilter = {}
            if(filter){
                objectFilter[filter[0]] = {'$regex': filter[1], $options: 'i'}
                console.log(objectFilter)
            }
            
            const  objectSort = {}
                if (sort){
                    objectSort[sort[1]] = sort[0]
                    }
                else 
                    {   
                        objectSort['name'] = 'asc'  
                    }
                const totalProduct = await Product.countDocuments(objectFilter)
                const productData = await Product.find(objectFilter).limit(limit).skip(page*limit).sort(objectSort)
            resolve({
                status: 'OK',
                massage: 'SUCCESS',
                data: productData,
                total: totalProduct,
                currentPage: page + 1,
                totalPage: Math.ceil(totalProduct/limit)
            })
        } catch(e){
            reject(e)
        }
    })
}

const getProductById = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct == null){
                resolve({
                    status: 'OK',
                    massage: 'Product not exist'
                })
            }
            resolve({
                status: 'OK',
                massage: 'Success',
                data: checkProduct
            })
        } catch(e){
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    getAllType,
    deleteManyProduct
}
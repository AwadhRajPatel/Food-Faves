const Product = require('../schema/productSchema');
const BadRequestError = require('../utils/BadRequestError');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productDetails) {
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
         if(error.name === 'ValidatorError'){

           const errorMessageList = Object.keys(error.errors).map((property) => {
               return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
        
        // console.log(error.name);
        // console.log(error.errors);
        // console.log(Object.keys(error.errors));
        // console.log(error);
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}


async function deleteProductById(productId) {
    try {
        const response = await Product.findByIdAndDelete(productId);
        // console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports ={
    createProduct,
    getProductById,
    deleteProductById
}
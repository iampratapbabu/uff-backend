//productmodel file to be imported here
const Product  = require('../models/productModel');

//dummy middleware for testing purpose
exports.dummyMiddleware = (req,res,next) =>{
	console.log("dummy middleware executed");
	next();
};

//Getting all Products
exports.getAllProducts = async(req,res) =>{
	try{
		const products = await Product.find();
		
		res.status(200).json({
			"total-products":products.length,
			products
		})
	}catch(err){
		res.status(500).json({
			msg:"SERVER ERROR",
			errMessage:err.message
		})
	}
};

//getting single product
exports.getSingleProduct = async(req,res) =>{
	try{
		const product = await Product.findById(req.params.productID);

		//checking if product exists
		if(!product){
			return res.status(404).json({msg:`Product with id ${req.params.productID} not found `});
		}
		res.status(200).json({
			product
		})
	}catch(err){
		res.status(500).json({
			msg:"SERVER ERROR",
			errMessage:err.message
		})
	}
};

//createProduct
exports.createProduct = async(req,res) =>{
	try{
		const { name,description,price,category,quantity,sold,photo} = req.body;
		product = new Product({
			name,
			description,
			price,
			category,
			quantity,
			sold,
			photo
		});

		//saving the product
		await product.save();
		res.status(201).json({
			product
		})

	}catch(err){
		res.status(500).json({
			msg:"SERVER ERROR",
			errMessage:err.message
		})
	}
};

exports.updateProduct = async(req,res) =>{
	try{
		const product = await Product.findByIdAndUpdate(req.params.productID,req.body,{new:true});
		if(!product){
			return res.status(404).json({msg:`Product with id ${req.params.productID} not found `});
		}
		res.status(200).json({
			msg:"Product Updated",
			product
		})
	}catch(err){
		res.status(500).json({
			msg:"SERVER ERROR",
			errMessage:err.message
		})
	}
};

exports.deleteProduct = async(req,res) =>{
	try{
		const product = await Product.findByIdAndDelete(req.params.productID);
		if(!product){
			return res.status(404).json({msg:`Product with id ${req.params.productID} not found `});
		}
		res.status(200).json({
			msg:"Product successfully deleted"
		})
	}catch(err){
		res.status(500).json({
			msg:"SERVER ERROR",
			errMessage:err.message
		})
	}
};



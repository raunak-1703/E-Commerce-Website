import userModel from "../Models/userModel.js"

export const addToCart = async (req,res)=>{
    
    try {
        const {userId,itemId,size} =req.body
        const user = await userModel.findById(userId)
        let CartData =  user.CartData
        if(CartData[itemId]){
            if(CartData[itemId][size]){
                CartData[itemId][size]+=1
            }
            else{
                CartData[itemId][size]=1
            }
        }
        else{
            CartData[itemId]={}
            CartData[itemId][size]=1
        }
        await userModel.findByIdAndUpdate(userId,{CartData})
        res.json({success:true,message:'Added to cart'})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export const updateCart = async (req,res)=>{
    
    try {
        const {userId,itemId,size,quantity} =req.body
        const user = await userModel.findById(userId)
        let CartData =  user.CartData
        CartData[itemId][size]=quantity
        await userModel.findByIdAndUpdate(userId,{CartData})
        res.json({success:true,message:'Cart Updated'})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export const getUserCart = async (req,res)=>{
    
    try {
        const {userId} = req.body
        const user = await userModel.findById(userId)
        let CartData =  user.CartData
        return res.json({success:true,CartData})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    // Check if the item exists in cart
    if (!user.CartData || !user.CartData[itemId]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    // Delete the item from CartData
    delete user.CartData[itemId];

    // Save updated user
    user.markModified('CartData');
    await user.save();

    res.status(200).json({ success: true, message: "Item removed from cart", CartData: user.CartData });

  } catch (error) {
    console.error("Error while deleting from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

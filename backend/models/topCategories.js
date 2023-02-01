import mongoose from 'mongoose'

const topCategorySchema = mongoose.Schema({
    category1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
        
    },
    category2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    category3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    category4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})


topCategorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

const TopCategory = mongoose.model('TopCategory', topCategorySchema)

export default TopCategory
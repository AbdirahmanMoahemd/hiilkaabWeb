import mongoose from 'mongoose'

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
})


brandSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
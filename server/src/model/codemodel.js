import mongoose, {Schema} from 'mongoose';

const { ObjectId } = mongoose.Schema

const CodeModel = new Schema({
    code: {type: String, required: true},
    userId: {type: ObjectId, ref: "User", required: true}
})

const ResetCode = mongoose.model("ResetCode", CodeModel)

export default ResetCode;
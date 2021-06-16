import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });


export default mongoose.model('Tasks', taskSchema);
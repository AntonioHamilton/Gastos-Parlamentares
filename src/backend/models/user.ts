import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
})

export default mongoose.models.User || mongoose.model('User', userSchema)
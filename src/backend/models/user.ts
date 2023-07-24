import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema

const userSchema = new Schema({
  name:  { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(String(this.password), 10);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema)
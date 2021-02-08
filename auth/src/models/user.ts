import mongoose from 'mongoose';

interface USER {
  email: string;
  password: string;
}

interface USERDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface USERModel extends mongoose.Model<USERDoc> {
  build(props: USER): USERDoc;
}

const userSchema = new mongoose.Schema({
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

userSchema.statics.build = (props: USERDoc) => {
  return new userModel(props);
};

const userModel = mongoose.model<USERDoc, USERModel>('User', userSchema);

export default userModel;

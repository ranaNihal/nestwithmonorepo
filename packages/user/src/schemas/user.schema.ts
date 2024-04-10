import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export interface IUserSchema extends mongoose.Document {
  name:string,
  email: string;
  password: string;
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;
}

export const UserSchema = new mongoose.Schema<IUserSchema>({
  name:{
    type:String,
    required:[true, 'name field is required']
  },
  email: {
    type: String,
    required: [true, 'email can not be empty'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email should be valid',
    ],
  },
  role: {
    type: String,
    enum : ['student', 'teacher'],
    required: [true, 'role can not be empty'],
  },
  password: {
    type: String,
    required: [true, 'Password can not be empty'],
    minlength: [6, 'Password should include at least 6 chars'],
  },
});

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});

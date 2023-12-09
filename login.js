const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } 
  });
  
  const User = mongoose.model('User', userSchema);
  taskSchema.add({ owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } });

  
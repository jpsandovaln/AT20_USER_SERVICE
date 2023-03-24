const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user_route');
const roleRouter = require('./routes/role_route');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://root:example@mongo:27017/myapp?authSource=admin')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  roles:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'rol'
},
  email: { type: String },
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const user = await User.create({ id, name, email });
    res.json(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

//Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
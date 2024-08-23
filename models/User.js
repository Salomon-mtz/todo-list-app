const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensure email is unique across all users
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function (next) {
  // If the password field has not been modified, proceed without re-hashing
  if (!this.isModified('password')) return next();

  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to save the user document
  next();
});

// Export the User model to be used in the application
module.exports = mongoose.model('User', UserSchema);

const { User } = require('./models');

const seedAdmin = async () => {
  try {
    await User.create({
      username: 'admin',
      password: '123', // Gunakan bcrypt di produksi!
      role: 'admin'
    });
    console.log("Admin seeded successfully!");
  } catch (err) {
    console.log("Admin already exists or error:", err.message);
  }
};
seedAdmin();
const { User } = require('../server/model/User');
const { db } = require('../server/database');

describe('Test User model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  test('User can be created and read from database', async () => {
    const user = await User.create({name: "James Brown", email: "JamesBrown@gmail.com", password: "123"})
    const createdUser = await User.findAll({
      where: {
        email: user.email
      }
    });

    expect(user.email).toBe(createdUser[0].email);
    });

    test('User can update password', async () => {
      const bassUser = await User.create({name: "Miles Davis", email: "MilesDavis@gmail.com", password: "123"})
      await bassUser.update({
        password: "New Guitar"
      });
      let passCheck = await User.findAll({
        where: {
          name: bassUser.name
        }
      });
      expect(passCheck[0].password).toBe("New Guitar");
    });


});

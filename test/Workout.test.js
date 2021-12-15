const { Workout, User } = require('../server/model/index');
const { db } = require('../server/database');

describe('Test Workout model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  test('Model can be created', async () => {
    await Workout.create({ type: 'Running', calories: 134, date: Date.now(), time: 23});
    const locatedWorkout = await Workout.findAll();

    expect(locatedWorkout.length).toBe(1)
  });

  test("Workout created and belongs to user", async () => {
    const user = await User.create({
      name:"Robert T.", 
      password: 453, 
      email: "RobTom@gmail.com"})
    await user.createWorkout({
      type: 'Weight-Lifting', 
      calories: 567, 
      date: Date.now(),
      time: 35})
    const locatedUser = await User.findAll({
      where: {
        name: user.name
      }
    })
    // await user.addWorkout(newWork);
    let findUserID = await Workout.findAll({
      where: {
        UserId: locatedUser[0].id
      }
    })

    expect(findUserID[0].UserId).toBe(locatedUser[0].id)
  })


})
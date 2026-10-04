'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // 1. Insert Users matching the Users table schema
    await queryInterface.bulkInsert('Users', [
      {
        email: 'alice@example.com',
        password: 'hashed_password_here',
        role: 'member',
        createdAt: now,
        updatedAt: now
      },
      {
        email: 'bob@example.com',
        password: 'hashed_password_here',
        role: 'member',
        createdAt: now,
        updatedAt: now
      }
    ]);

    // 2. Fetch generated user IDs using email
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const idOf = (email) => users.find((u) => u.email === email).id;

    // 3. Insert Tasks linked dynamically to those user IDs
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Complete GT8 Setup',
        dueDate: new Date('2026-08-26'),
        completed: false,
        userId: idOf('alice@example.com'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Review Express Routes',
        dueDate: new Date('2026-08-27'),
        completed: true,
        userId: idOf('alice@example.com'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Test PostgreSQL Integration',
        dueDate: new Date('2026-08-28'),
        completed: false,
        userId: idOf('bob@example.com'),
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
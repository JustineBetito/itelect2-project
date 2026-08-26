'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const now = new Date();

    // 1. Insert Users first
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        createdAt: now,
        updatedAt: now
      }
    ]);

    // 2. Fetch generated user IDs from PostgreSQL
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const idOf = (name) => users.find((u) => u.name === name).id;

    // 3. Insert Tasks linked dynamically to those user IDs
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Complete GT8 Setup',
        dueDate: new Date('2026-08-26'),
        completed: false,
        userId: idOf('Alice Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Review Express Routes',
        dueDate: new Date('2026-08-27'),
        completed: true,
        userId: idOf('Alice Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Test PostgreSQL Integration',
        dueDate: new Date('2026-08-28'),
        completed: false,
        userId: idOf('Bob Smith'),
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

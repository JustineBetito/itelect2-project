import { formatDate, validateTask, mergeTaskUpdate, createTask } from './utils.js';
import { fetchSampleUsers, fetchSampleUsersPromise } from './api.js';

console.log(formatDate(new Date("2026-07-22")));
console.log(validateTask());
console.log(validateTask({ title: "Finish GT3", dueDate: "2026-07-22" }));
console.log(mergeTaskUpdate({ title: "Old" }, { title: "New" }));

//gt4 updating from here

async function main() {
  try {
    const users = await fetchSampleUsers();
    console.log("Sample users:", users);

    const task = createTask({ title: "Finish GT4", dueDate: "2026-07-29" });
    console.log("Created task:", task);

    // Optional: also test the Promise-chaining version
    const usersPromiseStyle = await fetchSampleUsersPromise();
    console.log("Sample users (promise style):", usersPromiseStyle);
  } catch (err) {
    console.error("Something went wrong:", err.message);
  }
}

main();
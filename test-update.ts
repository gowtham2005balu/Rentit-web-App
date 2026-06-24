import { updatePropertyInDb } from './lib/backend';
import pool from './lib/db';

async function run() {
  const res = await updatePropertyInDb("32", "Residential", {
    title: "Test Property",
    locality: "Test Locality",
    rent: 5000,
    images: []
  });
  console.log("Result:", res);
  process.exit(0);
}
run();

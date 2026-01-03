import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tododb",
  password: "peter",
  port: 5432,
});

export default pool;

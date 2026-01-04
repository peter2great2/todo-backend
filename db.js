import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://todo_db_y1tv_user:pbGoNmtDW0HuvJnwAwqq2ZjHBtYgVMBW@dpg-d5d3vv95pdvs73d2qaf0-a.oregon-postgres.render.com/todo_db_y1tv",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

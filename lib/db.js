import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    connectionString: process.env.DATABASE,
  });
}

export default conn;

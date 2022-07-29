import { createConnection } from "../data-source";
import { v4 as uuidV4 } from "uuid"
import { hash } from "bcryptjs"


async function create() {
  const connection = await createConnection();

  const id = uuidV4()
  const password = await hash("admin", 8)
  
  console.log(connection.isInitialized)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXX')
    `
  )
  await connection.destroy()
}

create().then(() => console.log("User admin created!"))

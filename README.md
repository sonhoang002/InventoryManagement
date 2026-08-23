# Monster Book

## Seed the database

Both seed commands recreate the `monsters`, `region`, and `region_assign`
tables and insert the same dummy data. **They drop the existing tables first, so
do not run them against a database whose data you need to keep.**

### Local database

Set the local database values in `.env`:

```env
LOCAL_DB_HOST=localhost
LOCAL_DB_PORT=5432
LOCAL_DB_USER=your_postgres_user
LOCAL_DB_PASSWORD=your_postgres_password
LOCAL_DB_NAME=maple
```

Then run:

```sh
npm run db:seed:local
```

### Deployed database

Set `DATABASE_URL` to the external PostgreSQL connection string and run:

```sh
DATABASE_URL="postgresql://..." npm run db:seed
```

Alternatively, pass the connection string as an argument:

```sh
npm run db:seed -- "postgresql://..."
```

The deployment script automatically enables required SSL mode for non-local
database hosts when the URL does not already specify an SSL mode.

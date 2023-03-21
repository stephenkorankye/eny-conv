const { DB_PASSWORD } = process.env ; 

const connKey = `postgresql://doadmin:${DB_PASSWORD}@db-postgresql-fra1-38922-do-user-13073615-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=no-verify`;

export default connKey;

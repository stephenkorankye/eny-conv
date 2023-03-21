const { DB_PASSWORD , DB_URI , DB_PORT } = process.env ; 

const connKey = `postgresql://doadmin:${DB_PASSWORD}@${DB_URI}:${DB_PORT}/defaultdb?sslmode=no-verify`;

export default connKey;

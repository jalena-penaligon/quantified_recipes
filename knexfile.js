// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/recipes',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
          directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/dev',
        },
    },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/recipes',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true,
  },

};

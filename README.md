# Movie App Backend

Backend API for the Movie App built with Node.js, Express, and PostgreSQL.

## Features

- User authentication (JWT)
- Movie CRUD operations
- PostgreSQL database integration
- CORS enabled for frontend communication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT + bcrypt
- **Deployment**: Render

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### Movies (Protected)
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Create new movie
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment to Render

1. **Create Neon Database**:
   - Go to [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Deploy to Render**:
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `DATABASE_URL` - Your Neon connection string
     - `JWT_SECRET` - Secure random string
     - `NODE_ENV` - production

3. **Database Setup**:
   Run the SQL scripts in `scripts/setup-db.js` or `tutorial/day7.sql` in your Neon database.

## CORS Configuration

The backend is configured to accept requests from the Vercel frontend deployment.

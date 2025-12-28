# Database Setup Instructions

Your server needs a database connection to work properly.

## Your Database Details

Your app is configured to use Supabase PostgreSQL at:
- **Host**: `aws-0-eu-central-1.pooler.supabase.com`
- **Port**: `6543`
- **Database**: `postgres`
- **User**: `postgres.ibxjdbxhypvcksvnyqpe`

## Steps to Connect

1. **Get Your Database Password**
   - Go to your Supabase project dashboard
   - Navigate to Project Settings → Database
   - Find your database password (or reset it if needed)

2. **Update the `.env` File**
   - Open `/server/.env`
   - Replace `[YOUR-PASSWORD]` in both `DATABASE_URL` and `DIRECT_URL` with your actual password

Example:
```env
DATABASE_URL="postgresql://postgres.ibxjdbxhypvcksvnyqpe:your_actual_password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.ibxjdbxhypvcksvnyqpe:your_actual_password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

3. **Restart the Server**
   The server will automatically restart and connect to your database.

## ⚠️ Important Notes

- Never commit your `.env` file with the real password
- Keep your database password secure
- The `.env` file is already in `.gitignore`

# Deployment Guide - Jain Super Bazar

## Overview
This guide covers deploying both frontend and backend to production environments.

---

## Option 1: Deploy Backend to Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed
- Git initialized
- MongoDB Atlas account

### Step 1: Prepare Backend

1. Create `Procfile` in backend root:
```
web: npm start
```

2. Update `package.json` scripts if needed:
```json
"start": "node server.js"
```

3. Create `runtime.txt` (optional):
```
node-18.16.0
```

### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update this in Heroku app config

### Step 3: Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create jain-super-bazar-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-strong-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Seed database (if you have seed script)
heroku run npm run seed
```

Your backend will be available at: `https://jain-super-bazar-backend.herokuapp.com`

---

## Option 2: Deploy Backend to Railway

### Step 1: Create Account
Go to [Railway](https://railway.app) and create account

### Step 2: Connect Repository
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Select this repository
4. Railway detects it's a Node.js project

### Step 3: Set Environment Variables
In Railway dashboard:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-strong-secret-key
NODE_ENV=production
PORT=8081
```

### Step 4: Deploy
Railway auto-deploys on push to main branch

---

## Option 3: Deploy Frontend to Vercel

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

### Step 3: Deploy
```bash
vercel
```

Update `.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

---

## Option 4: Deploy Frontend to Netlify

### Step 1: Connect GitHub
1. Go to [Netlify](https://www.netlify.com)
2. Click "New site from Git"
3. Select GitHub repository

### Step 2: Configure Build
```
Build command: cd frontend && npm run build
Publish directory: frontend/dist
```

### Step 3: Set Environment Variables
In Netlify dashboard:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### Step 4: Deploy
Netlify auto-deploys on push

---

## Option 5: Self-Hosted (VPS/Server)

### Backend on VPS

#### Requirements
- VPS (DigitalOcean, AWS, Linode, etc.)
- Node.js and npm
- MongoDB (or MongoDB Atlas)
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

#### Steps

1. **SSH into server:**
```bash
ssh root@your-server-ip
```

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB (optional):**
```bash
sudo apt-get install -y mongodb
```

4. **Clone repository:**
```bash
git clone your-repo-url
cd website\ jsb/backend
```

5. **Install dependencies and setup:**
```bash
npm install
cp .env.example .env
# Edit .env with production values
npm run seed  # If using local MongoDB
```

6. **Setup PM2 (Process Manager):**
```bash
npm install -g pm2
pm2 start server.js --name "jain-super-bazar"
pm2 startup
pm2 save
```

7. **Setup Nginx:**
```bash
sudo apt-get install nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/jain-super-bazar
```

Add this config:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/jain-super-bazar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL (Let's Encrypt):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Frontend on VPS

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Copy to web root:**
```bash
sudo cp -r dist/* /var/www/html/
```

3. **Setup Nginx for frontend:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}
```

---

## Docker Deployment

### Frontend Docker

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Docker

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/jain-super-bazar
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

Deploy:
```bash
docker-compose up -d
```

---

## Production Security Checklist

### Backend
- [ ] Change JWT_SECRET to a strong value
- [ ] Set NODE_ENV to 'production'
- [ ] Use HTTPS/SSL certificate
- [ ] Setup firewall rules
- [ ] Enable CORS only for frontend domain
- [ ] Use MongoDB with authentication
- [ ] Enable MongoDB backup
- [ ] Setup error logging (Sentry, LogRocket)
- [ ] Implement rate limiting
- [ ] Setup monitoring and alerts
- [ ] Regular security updates

### Frontend
- [ ] Build optimized production bundle
- [ ] Update API URL to production
- [ ] Enable HTTPS
- [ ] Compress assets (gzip)
- [ ] Optimize images
- [ ] Remove console logs and debuggers
- [ ] Setup CDN for static assets
- [ ] Enable caching headers
- [ ] Monitor performance (Google Analytics)

---

## Email Notifications (Optional)

Add nodemailer for order confirmations:

```bash
npm install nodemailer
```

Add to `.env`:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

---

## Monitoring & Logging

### Backend Monitoring

Consider these services:
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **LogRocket** - User session recording
- **Datadog** - Infrastructure monitoring

### Frontend Monitoring

- **Google Analytics** - User analytics
- **Sentry** - Error tracking
- **LogRocket** - Session recording
- **Hotjar** - User behavior

---

## Scaling Considerations

For high traffic:
- Use MongoDB Atlas (managed and scalable)
- Implement Redis caching
- Use CDN for frontend
- Load balancing for backend
- Database indexing optimization
- API rate limiting
- Horizontal scaling with Docker/Kubernetes

---

## Post-Deployment

1. **Test all features** in production
2. **Monitor logs** for errors
3. **Setup automated backups**
4. **Configure alerts** for issues
5. **Plan scaling** as traffic grows
6. **Regular updates** and patches
7. **Performance optimization**
8. **User feedback collection**

---

## Useful Commands

```bash
# Check server status
curl https://your-api-domain.com/api/health

# View logs (if using PM2)
pm2 logs

# Monitor traffic
htop

# Clear MongoDB cache
db.dropDatabase()

# View MongoDB stats
db.stats()
```

---

## Troubleshooting Deployment

### CORS Issues
Add frontend domain to backend CORS config:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}))
```

### Database Connection
Test connection:
```bash
mongosh "your-connection-string"
```

### SSL Certificate
Renew Let's Encrypt:
```bash
sudo certbot renew
```

### Memory Issues
Increase server RAM or optimize code

---

## Cost Estimation

### Heroku
- Frontend: $50/month (Hobby = Free)
- Backend: $50/month (Eco = Free)
- MongoDB Atlas: $0-100+/month (depending on usage)

### Railway
- Similar to Heroku, ~$5-20/month

### Netlify
- Frontend: $0 (Free tier)

### DigitalOcean VPS
- $5-80/month (depending on size)

### AWS
- Variable based on usage (typically $20-100+)

---

## Support

For more information on specific platforms:
- [Heroku Docs](https://devcenter.heroku.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Railway Docs](https://docs.railway.app/)

---

**Happy Deploying! 🚀**

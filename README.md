# 🌍 WonderLust – Airbnb Clone  

A **full-stack Airbnb clone** built with **Node.js, Express, MongoDB, and EJS**.  
This project allows users to explore, add, edit, add reviews and manage rental listings with authentication, CRUD operations, and image uploads – similar to Airbnb’s core functionality.  

🔗 **Live Demo**: https://wounderlust-airbnb-website.onrender.com

---

## ✨ Features  

- 🔐 **Authentication & Authorization** (Signup, Login, Logout)  
- 🏡 **Listings Management** (CRUD – Create, Read, Update, Delete)  
- 📸 **Image Uploads** with Cloudinary & Multer  
- 📍 **Explore Listings** with categories & search  
- 👤 **User Accounts** – listings tied to owners  
- 🎨 **Responsive UI** with Bootstrap & custom CSS  
- ☁️ **Deployed** on Render + MongoDB Atlas  

---

## 🛠️ Tech Stack  

**Frontend:**  
- HTML, CSS, Bootstrap, EJS, Tailwind CSS  

**Backend:**  
- Node.js, Express.js  , javascript

**Database:**  
- MongoDB Atlas  , mongoDB database

**Other Tools & Libraries:**  
- Passport.js (Authentication)  
- Multer & Cloudinary (Image Uploads & Storage)  
- Render (Deployment)  

---

## 📸 Screenshots  

### Homepage  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/745b3c1c-8933-4706-b03a-fdec3de31cc4" />
 

### New Listings Page  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f65a3ee9-2662-4f8c-89dc-3c12bd3d2dc4" />
 

### Authentocation and Autherization page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/76be80fc-f94e-4b2d-9eef-42afc2a3464e" />

### Edit and Delete page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1aa051eb-832c-4382-8382-08acb6f27ce4" />


---

## ⚙️ Installation & Setup  

Clone the repo and install dependencies:  

```bash
git clone https://github.com/your-username/wounderlust-airbnb.git

```
---

## Create a .env file in the root directory and add:
- CLOUDINARY_CLOUD_NAME=your_cloudinary_name
- CLOUDINARY_KEY=your_cloudinary_key
- CLOUDINARY_SECRET=your_cloudinary_secret
- MONGO_URI=your_mongodb_atlas_uri
- SESSION_SECRET=your_secret_key

cd wounderlust-airbnb
npm install

## Run the app locally:
```bash
npm start
```

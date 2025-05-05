# MyBlog 📝

A full-featured blogging platform built with [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [Passport.js](http://www.passportjs.org/), and [EJS](https://ejs.co/). This platform allows users to register, authenticate, write blog posts, upload images, and browse other users’ blogs.

## 🚀 Features

- User authentication (sign up, login, logout)
- Blog post creation, editing, and deletion
- Image uploads using Multer
- Responsive and clean UI with EJS templating
- Flash messages for feedback
- MongoDB storage with Mongoose models

## 🛠 Tech Stack

| Tech         | Description                           |
|--------------|---------------------------------------|
| Express.js   | Web framework for Node.js             |
| MongoDB      | NoSQL database                        |
| Mongoose     | MongoDB object modeling               |
| Passport.js  | Authentication middleware             |
| EJS          | Embedded JavaScript templating        |
| Multer       | Middleware for handling file uploads  |
| Bootstrap/CSS| Styling (or specify your UI framework)|
| Dotenv       | Manage environment variables          |

## Run the app: 
node index.js

📁 Folder Structure

MyBlog/ </br>
├── models/          # Mongoose models </br>
├── routes/          # Express route handlers </br>
├── views/           # EJS templates </br>
├── public/          # Static files (CSS, images) </br>
├── uploads/         # Uploaded images </br>
├── config/          # Passport and DB config </br>
├── app.js           # Entry point </br>
├── .env             # Environment variables </br>
└── package.json </br>
</br>

🔒 Authentication
Local strategy with Passport.js
Sessions and cookies for persistent login
Protected routes for creating/editing/deleting blogs

🖼 Image Uploads
Handled via Multer
Images are stored in Cloudinary
Validations for file type

📸 Screenshots
![image](https://github.com/user-attachments/assets/1e8c44f6-f3ff-4f44-9c8d-b51bb0326cde)
![image](https://github.com/user-attachments/assets/4c0a9b6b-dbb5-40d2-a34c-8e403ba27492)
![image](https://github.com/user-attachments/assets/433f0f2b-01a9-469e-b603-797e627cb4ee)
![image](https://github.com/user-attachments/assets/2ea80740-9b3f-4bbf-9be7-dcbb18f213f0)
![image](https://github.com/user-attachments/assets/93da3d37-316c-4e7b-a737-45be5f53e921)




🧑‍💻 Author
Your Name – [@yourgithub](https://github.com/Raghavdwivedi45/)

🌐 Demo
https://articleverse.onrender.com/

# 📚 Online Library System

## 🎓 Project Overview
This project is an Online Library System developed as part of the **Web Technology (IS231)** course. The system manages library operations, allowing users to browse and borrow books while giving administrators the tools to manage the library's inventory.

**Supervised by:** Prof. Dr. Neamat El Tazi

---

## 👥 Team Members

| Name | Student ID |
| :--- | :--- |
| **Abdallah Sherif Sayed Mohamed** | 20240327 |
| **Arwa Atef Ahmed Abdelhalem** | 20240808 |
| **Mohamed Atef Ahmed Abdelhalem** | 20240809 |
| **Amr Tamer Abdellatif** | 20240394 |
| **Amr Khaled AbdElkader** | 20240397 |
| **Ali Mohamed Mahrous** | 20240351 |

---

## ✨ System Features

The website supports two distinct types of users: **Admin** and **User**. During the sign-up process, individuals can choose their role by filling out the registration form (fields: username, password, confirm password, email, and `is_admin`).

### 🛡️ Admin Capabilities
Admins have full control over the library's book inventory. They can:
1. **Sign Up & Login:** Register and access the admin dashboard.
2. **Add New Books:** Insert new books into the system (storing ID, book name, author, category, and description).
3. **View Books:** View the complete list of available books.
4. **Edit Books:** Select a specific book to update its details.
5. **Delete Books:** Remove a book from the library system entirely.

### 👤 User Capabilities
Users can interact with the library to find and check out books. They can:
1. **Sign Up & Login:** Register and access their personal account.
2. **Search:** Search the library for books by title, author, or category, with results displayed dynamically.
3. **View Book Status:** View a list of books marked clearly as either "available" or "not available" (if currently borrowed by someone else).
4. **View Details:** Select a book to view its comprehensive details on a dedicated book page.
5. **Borrow Books:** Check out a book (only applicable if the book's status is available).
6. **My Borrowed Books:** View a personalized list of all books they have currently borrowed.

### 🖥️ User Interface & Navigation
* **Global Navigation Bar:** A navigation bar is accessible from all web pages for seamless browsing.
* **Dynamic Rendering:** The navigation bar adjusts dynamically based on the logged-in user, showing relevant links for either an Admin or a standard User.

---

## 📄 License
This project is for educational purposes as part of the IS231 course curriculum.
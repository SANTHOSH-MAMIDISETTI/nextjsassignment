'use client'

// import {Layout} from '../../layout/layout';
import Layout from '../../layout/layout';
import { FC } from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Adjust the path as necessary
// D:\tasks\fullstacknextjs\my-app\pages\api\login.tsx
const HomePage: FC = () => {
  return (
    <div>
      <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to Your Application</h1>
        <nav>
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>Application Overview</h2>
        <p>
          This is a full-stack web application with role-based access. Use the
          navigation menu to access different parts of the application.
        </p>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Your Application. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
};

export default HomePage;
   
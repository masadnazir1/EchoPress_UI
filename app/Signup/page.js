"use client"

import { useState } from 'react';
import Image from 'next/image';
import styles from './Signup.module.css'; // Adjust the path to your CSS module
import authService from '@/services/authService';
import GoogleLogo from "../assets/GLogo.webp";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const data = await authService.registerUser(name, email, password);
      // Handle successful registration (e.g., show success message or redirect)
      console.log('Registration successful:', data);
      // Redirect after successful registration (using next/router or window.location)
      // Router.push('/login');
    } catch (err) {
      setError(err.message); // Show the error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerBox}>
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>Create your account</p>
        <form className={styles.form} onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.registerButton} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className={styles.divider}>or</div>
        <button className={styles.googleButton}>
          <Image className={styles.googleIcon} src={GoogleLogo} alt="Google" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;

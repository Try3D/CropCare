import styles from './Login.module.css';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [_, setId] = useAtom(userId);

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('userId', data.userid);
        setId(data.userId);
      })
  }

  return (
    <>
      <div className={styles.title}>
        Sign In
      </div>
      <div className={styles.form}>
        <form onSubmit={formSubmit} >
          <div>
            <input type="email" placeholder="Email:" onChange={e => setEmail(e.target.value)} value={email} />
          </div>
          <div>
            <input type="password" placeholder="Password:" onChange={e => setPassword(e.target.value)} value={password} />
          </div>
          <div><input type="submit" value="Log in" /></div>
        </form>
      </div>

      <h2 style={{ paddingTop: "50px" }}>Demo users:</h2>
      <div style={{ paddingTop: "15px" }}><span style={{ color: "#111", fontWeight: "bold" }}>User 1:</span> user@example.com <span style={{ color: "#111", fontWeight: "bold" }}>password:</span> password</div>
      <div style={{ paddingTop: "15px" }}><span style={{ color: "#111", fontWeight: "bold" }}>User 2:</span> test@example.com <span style={{ color: "#111", fontWeight: "bold" }}>password:</span> password</div>
      <div style={{ paddingTop: "15px" }}><span style={{ color: "#111", fontWeight: "bold" }}>User 3:</span> john@example.com <span style={{ color: "#111", fontWeight: "bold" }}>password:</span> password</div>
      <div style={{ paddingTop: "15px" }}><span style={{ color: "#111", fontWeight: "bold" }}>User 4:</span> alice@example.com <span style={{ color: "#111", fontWeight: "bold" }}>password</span>: password</div>
    </>
  );
}

export default Login;

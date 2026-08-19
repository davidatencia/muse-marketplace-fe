import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import { setTokens } from '@shared/api/tokenStorage';
import { login } from '@public/auth/api/authApi';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import logo from '@shared/assets/logos/logo-mark.png';
import styles from './Login.module.css';
import GradientBackground from '@/shared/components/ui/GradientBackground/GradientBackground';
import { setUserInformation } from '@/shared/api/userInformationStorage';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const {
        authData: { access_token, refresh_token },
        userData,
      } = await login({ email, password });
      setTokens(access_token, refresh_token);
      setUserInformation(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo conectar con el servidor'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.login}>
      <GradientBackground />
      <div className={styles.card}>
        <img src={logo} alt="Musé" className={styles.logo} />
        <h1 className={styles.heading}>Iniciar sesión</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.submit}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

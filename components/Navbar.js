import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Asegúrate de que el contexto esté en esta ruta
import styles from '@/styles/navbar.module.css'; // Importa el CSS como módulo

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push('/login'); // Reemplaza useNavigate() con router.push()
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>MISIONES DE VIDA</Link>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}><Link href="/main-quest" className={styles.navLink}>Metas</Link></li>
          <li className={styles.navItem}><Link href="/completed-goals" className={styles.navLink}>Metas Cumplidas</Link></li>

          {!user ? (
            <>
              <li className={styles.navItem}><Link href="/login" className={styles.navLink}>Log In</Link></li>
              <li className={styles.navItem}><Link href="/register" className={styles.navLink}>Sign Up</Link></li>
            </>
          ) : user.role === 'admin' ? (
            <>
              <li className={styles.navItem}><Link href="/add-goal" className={styles.navLink}>Agregar metas</Link></li>
              <li className={styles.navItem}><button onClick={handleLogout} className={styles.navButton}>Log Out</button></li>
            </>
          ) : (
            <>
              <li className={styles.navItem}><Link href="/suggest" className={styles.navLink}>Sugerir metas</Link></li>
              <li className={styles.navItem}><button onClick={handleLogout} className={styles.navButton}>Log Out</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

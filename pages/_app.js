import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Asegúrate de que la ruta sea correcta

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}


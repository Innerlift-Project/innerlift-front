"use client";

import SectionLine from "@/components/layout/SectionLine";
import LoginForm from "@/components/form/LoginForm";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Link from "@/components/layout/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./page.module.css";

export default function Login() {
  return (
    <section className={styles.loginContainer}>
      <div className={styles.placeholderSection}>
        <h1 className={styles.placeholderText}>Placeholder</h1>
      </div>
      
      <div className={styles.loginContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Bem-vindo de volta!</h1>
          <h2 className={styles.subtitle}>
            Preencha seus dados para acessar a plataforma
          </h2>
        </div>
        <div className={styles.formContainer}>
          <LoginForm />

          <div className={styles.signupLink}>
            <p>
              Não tem uma conta?{" "}
              <Link href="/signup" variant={LinkVariant.SECONDARY}>
                Cadastre-se
              </Link>
            </p>
          </div>

          <SectionLine text="Ou registre com" />

          <div className={styles.socialButtons}>
            <Button
              variant={ButtonVariant.GHOST}
              size={ButtonSize.LARGE}
              icon={{
                src: "/google.svg",
                alt: "Google icon",
              }}
            >
              Google
            </Button>
            <Button
              variant={ButtonVariant.GHOST}
              size={ButtonSize.LARGE}
              icon={{
                src: "/facebook.svg",
                alt: "Facebook icon",
              }}
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
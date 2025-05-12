import SectionLine from "@/components/layout/SectionLine";
import LoginForm from "@/components/form/LoginForm";
import SignupForm from "@/components/form/SignupForm";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Link from "@/components/ui/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return [{ action: 'login' }, { action: 'signup' }, { action: 'recover' }]
}

export default async function AccessPage({
  params,
}: {
  params: Promise<{ action: string }>
}) {
  const { action } = await params;

  const sectionLineText = action === "login" ? "Ou registre com" : action === "signup" ? "Ou entre com" : "";
  return (
    <section className={styles.loginContainer}>
      <div className={styles.placeholderSection}>
        <h1 className={styles.placeholderText}>Placeholder</h1>
      </div>
      
      <div className={styles.loginContent}>
        <div className={styles.header}>
        {action && action === "login" && (
          <>
          <h1 className={styles.title}>Bem-vindo de volta!</h1>
          <h2 className={styles.subtitle}>
            Preencha seus dados para acessar a plataforma
          </h2>
          </>
        )}
        {action && action === "signup" && (
          <>
          <h1 className={styles.title}>Cadastre-se</h1>
          <h2 className={styles.subtitle}>
          Preencha os campos abaixo para criar sua conta
          </h2>
          </>
        )}
        </div>
        <div className={styles.formContainer}>
          {action && action === "login" && (
            <>
              <LoginForm />

              <div className={styles.signupLink}>
                <p>
                  Não tem uma conta?{" "}
                  <Link href="/access/signup" variant={LinkVariant.SECONDARY}>
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </>
          )}
          {action && action === "signup" && (
            <>
              <SignupForm />

              <div className={styles.signupLink}>
                <p>
                  Já tem uma conta?{" "}
                  <Link href="/access/login" variant={LinkVariant.SECONDARY}>
                    Logue-se
                  </Link>
                </p>
              </div>
            </>
          )}
          

          <SectionLine text={sectionLineText} />

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
import SectionLine from "@/components/layout/SectionLine";
import LoginForm from "@/components/form/LoginForm";
import SignupForm from "@/components/form/SignupForm";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Link from "@/components/ui/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./page.module.css";
import Image from "next/image";

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
      <div className={styles.background}></div>
        <div className={styles.loginContent}>
          <div className={styles.container}>
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
                    <Link href="/access/signup" variant={LinkVariant.PRIMARY}>
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
                    <Link href="/access/login" variant={LinkVariant.PRIMARY}>
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
      </div>
      <div className={styles.logoSection}>
        <Image
          src="/logo.png"
          alt="InnerLift Logo"
          className={styles.logo}
          width={257}
          height={257}
        />
        <h1 className={[styles.logoText, "alegreya-medium" ].join(" ")}>Inner<br/>Lift</h1>
      </div>
    </section>
  );
}
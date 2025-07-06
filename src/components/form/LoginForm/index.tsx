"use client";
import { useState } from "react";

import Form from "next/form";
import InputField from "../../ui/InputField";
import { FieldTypes } from "../../../types/InputField";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Checkbox from "../../ui/Checkbox";
import Link from "@/components/ui/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./styles.module.css";

import { useAuth } from "@/hooks/useAuth";


export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [rememberMe, setRememberMeValue] = useState(false);

  const {
    signInRequestEmail,
    signInRequestUsername,
  } = useAuth()

  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (usernameOrEmail.includes('@')) {
        await signInRequestEmail(usernameOrEmail, password);
      } else {
        await signInRequestUsername(usernameOrEmail, password);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    setPasswordValue('');
    setUsernameOrEmailValue('');
  }


  return (
    <Form action="POST" onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputWraper}>
        <InputField
          label="Username ou E-mail"
          title="Username ou E-mail"
          name="username"
          placeholder="exemplo@email.com"
          value={usernameOrEmail}
          onValueChange={(value) => setUsernameOrEmailValue(value as string)}
          required
        />
      </div>
      <div className={styles.inputWraper}>
      <InputField
        label="Senha"
        name="password"
        type={FieldTypes.PSWD}
        placeholder="Insira a sua senha"
        minLength={8}
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
        title="At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
        value={password}
        onValueChange={(value) => setPasswordValue(value as string)}
        required
      />
      </div>

      <div className={styles.optionsContainer}>
        <Checkbox
          label="Lembrar acesso"
          name="rememberMe"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMeValue(e.target.checked)}
        />
        <div>
          <Link href="/#" variant={LinkVariant.PRIMARY}>
            Esqueceu a senha?
          </Link>
        </div>
      </div>
      
      <div className={styles.buttonContainer}>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          type="submit"
        >
          Entrar
        </Button>
      </div>
    </Form>
  );
}
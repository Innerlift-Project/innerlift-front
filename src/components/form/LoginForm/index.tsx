"use client";
import { useState } from "react";

import { auth } from "@/app/firebase/config";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";

import { useRouter } from "next/navigation";

import Form from "next/form";
import InputField from "../../ui/InputField";
import { FieldTypes } from "../../../types/InputField";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Checkbox from "../../ui/Checkbox";
import Link from "@/components/ui/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./styles.module.css";


export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [rememberMe, setRememberMeValue] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  function isValidEmail(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.trim().length > 0 && emailRegex.test(email);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(usernameOrEmail)) {
      console.log('Entrada não é um e-mail');
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(usernameOrEmail, password);
      if (res) {
        console.log('Login successful:', res.user);
        router.push('/');
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
          <Link href="/#" variant={LinkVariant.SECONDARY}>
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
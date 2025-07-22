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


export default function SignupForm() {
  const [name, setNameValue] = useState('');
  const [username, setUsernameValue] = useState('');
  const [email, setEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPasswordValue] = useState('');
  const [tosAndPrivacy, setTosAndPrivacyValue] = useState(false);
  const { signUpRequest } = useAuth();
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try{
      const body = {
        name,
        username,
        email,
        password,
        confirmPassword,
        tosAndPrivacy
      };
      await signUpRequest(body);


    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    }

  }

  return (
    <Form action="POST" className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.inputWraper}>
        <InputField
          type={FieldTypes.TEXT}
          label="Nome completo"
          title="Nome completo"
          name="name"
          placeholder="Jhon Doe"
          value={name}
          onValueChange={(value) => setNameValue(value as string)}
          required
        />
      </div>
      <div className={styles.inputWraper}>
        <InputField
          type={FieldTypes.TEXT}
          label="Nome de usuário"
          title="Nome de usuário"
          name="username"
          placeholder="jdoe123"
          value={username}
          onValueChange={(value) => setUsernameValue(value as string)}
          required
        />
      </div>
      <div className={styles.inputWraper}>
        <InputField
          type={FieldTypes.EMAIL}
          label="E-mail"
          title="E-mail"
          name="username"
          placeholder="exemplo@email.com"
          value={email}
          onValueChange={(value) => setEmailValue(value as string)}
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
      <div className={styles.inputWraper}>
      <InputField
        label="Confirmação de senha"
        name="password"
        type={FieldTypes.PSWD}
        placeholder="Confirme a sua senha"
        minLength={8}
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
        title="At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
        value={confirmPassword}
        onValueChange={(value) => setConfirmPasswordValue(value as string)}
        required
      />
      </div>

      <div className={styles.optionsContainer}>
        <Checkbox
          name="tosAndPrivacy"
          id="tosAndPrivacy"
          required
          onValueChange={(value) => setTosAndPrivacyValue(value as boolean)}
          checked={tosAndPrivacy}
        >
          Concordo com os 
          <Link href="/#" variant={LinkVariant.SECONDARY}>
            Termos de Serviço
          </Link> 
          e 
          <Link href="/#" variant={LinkVariant.SECONDARY}>
            Política de Privacidade
          </Link>
        </Checkbox>
      </div>
      
      <div className={styles.buttonContainer}>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
        >
          Criar Conta
        </Button>
      </div>
    </Form>
  );
}
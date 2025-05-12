"use client";
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/services/userService';

import { useState } from "react";
import { auth } from "@/app/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import Form from "next/form";
import InputField from "../../ui/InputField";
import { FieldTypes } from "../../../types/InputField";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import Checkbox from "../../ui/Checkbox";
import Link from "@/components/ui/Link";
import { LinkVariant } from "@/types/Link";
import styles from "./styles.module.css";
import { UUID } from 'crypto';

export default function SignupForm() {
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPasswordValue] = useState('');
  const [tosAndPrivacy, setTosAndPrivacyValue] = useState(false);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      alert(`Usuário ${data.name} criado!`);
    },
  });

  async function handleSubmit(event: React.FormEvent) {
    try{
      event.preventDefault();
      if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }
      const res = await createUserWithEmailAndPassword(email, password);
      if (res) {
        console.log("Usuário criado com sucesso:", res.user);
        mutation.mutate({
          name: name as string,
          id: res.user.uid as UUID,
        });
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    }
    setNameValue('');
    setEmailValue('');
    setPasswordValue('');
    setConfirmPasswordValue('');
    setTosAndPrivacyValue(false);
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
          onChange={(event) => setTosAndPrivacyValue(event.target.checked)}
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
          Entrar
        </Button>
      </div>
    </Form>
  );
}
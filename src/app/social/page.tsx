"use client";

import NavInterface from "@/components/layout/NavInterface";
import PageComponent from "@/components/layout/PageComponent";
import Button from "@/components/ui/Button";
import { ButtonSize, ButtonVariant } from "@/types/Button";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
    const router = useRouter()
    return (
        <div>
        <NavInterface>
            <PageComponent>
                <div className={styles.header}>
                    <Button  className={styles.backBtn} variant={ButtonVariant.GHOST} size={ButtonSize.MEDIUM} onClick={() => {router.back();}}>
                        <i className="bi bi-chevron-left"></i> Voltar
                    </Button>
                    <h1>Forum</h1>
                </div>
            </PageComponent>
        </NavInterface>
        </div>
    );
}

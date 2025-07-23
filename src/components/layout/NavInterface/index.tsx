"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { NavInterfaceProps } from "@/types/NavInterface";
import Button from "@/components/ui/Button";
import { ButtonVariant, ButtonSize } from "@/types/Button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function NavInterface(props: NavInterfaceProps) {
    const router = useRouter()
    const {
        user,
        signOut,
    } = useAuth()

    useEffect(() => {
        console.log('User:', user);
        if (!user || !user.id) {
            router.push('/access/login');
        }
    }, [user, router]);

    return (
        <div className={`${styles.navInterface} ${props.className || ""}`}>
            <div className={styles.topContainer}>
                <div className={styles.logoSection}>
                    <Image
                        src="/logo.png"
                        alt="InnerLift Logo"
                        className={styles.logo}
                        width={80}
                        height={80}
                    />
                    <h5 className={[styles.logoText, "alegreya-medium" ].join(" ")}>Inner<br/>Lift</h5>
                </div>
                <div className={styles.profileSection}>
                </div>
            </div>
            <div className={`${styles.bottomContainer}`}>
                <div className={styles.leftMenu}>
                    <div className={styles.topButtons}>
                        <Button className={styles.navBtn} variant={ButtonVariant.GHOST} size={ButtonSize.LARGE} onClick={() => {router.push('/');}}><i className="bi bi-house-fill"></i>Home</Button>
                        <Button className={styles.navBtn} variant={ButtonVariant.GHOST} size={ButtonSize.LARGE} onClick={() => {router.push('/social');}}><i className="bi bi-at"></i>Forum</Button>
                    </div>
                    <div className={styles.bottomButtons}>
                        <Button className={styles.navBtn} variant={ButtonVariant.GHOST} size={ButtonSize.LARGE} onClick={() => {signOut(); router.push('/access/login');}}>Sair</Button>
                    </div>
                </div>
                <div className={styles.pageContent}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
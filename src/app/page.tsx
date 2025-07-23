"use client";

import NavInterface from "@/components/layout/NavInterface";
import PageComponent from "@/components/layout/PageComponent";
import Button from "@/components/ui/Button";
import { ButtonSize, ButtonVariant } from "@/types/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <NavInterface>
        <PageComponent>
          <Button
            variant={ButtonVariant.GHOST}
            size={ButtonSize.LARGE}
            onClick={() => {router.push('/social');}}
          >
            Forum
          </Button>
        </PageComponent>
      </NavInterface>
    </div>
  );
}

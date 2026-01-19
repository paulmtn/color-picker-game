"use client"
import { Button } from "@/components/ui/button"
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();

    const handleStartGame = () => {
        router.push("/color-game");
    }
    return (
        <main style={{ backgroundColor: "rgb(99, 99, 99)", minHeight: "100vh"}}>
            <h1 className={styles.header}>Color Picker Game</h1>
            <Button size="lg" onClick={handleStartGame}>
                Start Game
            </Button>
            
        </main>
    );
}
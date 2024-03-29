import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../component/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const [address, setAddress] = useState("");
    const account = useAccount();
    const router = useRouter();
    useEffect(() => {
        if (account.address && router) {
            router.push("/dates");
            setAddress(String(account.address));
        } else setAddress("");
    }, [account]);
    return (
        <div className={styles.container}>
            <Head>
                <title>RainbowKit App</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <main className={styles.main}>
                <Header />
                <div className={styles.main_image}>
                    <Image
                        src="/assets/cara1.png"
                        alt="logo"
                        width={300}
                        height={300}
                    />
                </div>
                {address == "" && <ConnectButton label={"Login"} />}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/Ikereth/rolla-love"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Made with ❤️ by Rolla-love
                </a>
            </footer>
        </div>
    );
};

export default Home;

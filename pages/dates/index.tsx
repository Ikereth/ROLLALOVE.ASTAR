import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Dates.module.css";
import Header from "../../component/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Modal from "../../component/modal";
import { useWriteContract } from "wagmi";
import contract from "../../contract.json";

const Dates: NextPage = () => {
    const [person, setPerson] = useState(0);
    const account = useAccount();
    const router = useRouter();
    const { data: hash, isPending, writeContract } = useWriteContract();

    useEffect(() => {
        if (!account.address && router) {
            router.push("/");
        }
    }, [account]);

    const cancel = async () => {
        if (person == 2) setPerson(0);
        else if (person == 1) setPerson(0);
        else setPerson(person + 1);
    };

    const approve = async () => {
        if (person == 2) {
            setPerson(0);
        } else {
            if (person == 1) {
                setTimeout(() => {
                    if (!isModalOpen) setIsModalOpen(true);
                }, 3000);
            }
            setPerson(person + 1);
        }
    };

    const people = [
        {
            name: "Daniela Gomez",
            image: "cara2",
        },
        {
            name: "Mariana Gonzales",
            image: "cara3",
        },
        {
            name: "Mariana Gonzales",
            image: "cara3",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setPerson(0);
    }, [hash]);
    const handleSendMessage = (message: string) => {
        writeContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi,
            functionName: "setGreeting",
            args: [message],
            value: BigInt(1),
        });
        console.log("Mensaje enviado:", message);
    };

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
                        src={`/assets/${people[person].image}.png`}
                        alt="cara"
                        width={300}
                        height={300}
                    />
                    <div className={styles.main_image_name}>
                        {people[person].name}
                    </div>
                    {person == 2 ? (
                        <div className={styles.main_match}>
                            <div
                                className={styles.main_image_match}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Image
                                    src="/assets/corazon.png"
                                    alt="heart"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={styles.main_text_match}>
                                Hiciste Match con {people[person].name}!!
                            </div>
                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSendMessage={handleSendMessage}
                                name={people[person].name}
                            />
                        </div>
                    ) : (
                        <div className={styles.main_image_buttons}>
                            <div
                                className={styles.main_image_buttons_items}
                                onClick={() => cancel()}
                            >
                                <Image
                                    src="/assets/cancel.png"
                                    alt="cancel"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <div
                                className={styles.main_image_buttons_items}
                                onClick={() => approve()}
                            >
                                <Image
                                    src="/assets/approve.png"
                                    alt="approve"
                                    width={60}
                                    height={60}
                                />
                            </div>
                        </div>
                    )}
                </div>
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
export default Dates;

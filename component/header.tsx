import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Header: React.FC = () => {
    const [address, setAddress] = useState("");
    const account = useAccount();
    useEffect(() => {
        if (account.address) setAddress(String(account.address));
        else setAddress("");
    }, [account]);
    return (
        <div className={styles.header}>
            <Image
                src="/assets/logorollalovee.png"
                alt="logo"
                width={140}
                height={40}
            />
            {address != "" && <ConnectButton label={"Login"} />}
        </div>
    );
};

export default Header;

import React from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";


type NetworkContextType = {
    isConnected: boolean;
} | null

export const NetworkContext = React.createContext<NetworkContextType>(null);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
    const { isConnected } = useNetworkStatus();
    return (
        <NetworkContext.Provider value={{
            isConnected: isConnected === null ? true : isConnected
        }}>
            {children}
        </NetworkContext.Provider>
    )
}

export const useNetworkContext = () => {
    const context = React.useContext(NetworkContext);
    if (!context) {
        throw new Error("useNetworkContext must be used within a NetworkProvider");
    }
    return context;
}


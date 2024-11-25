"use client";
import React from "react";
import * as S from "./styles";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/adminHeader/adminHeader";

const Admin: React.FC = () => {
    const router = useRouter();

    
    const routes: { [key: string]: string } = {
        "Usuários": "/admin/user",
        "Permissões": "/admin/permissions",
        "Comercial": "/admin/commercial",
        "Administrativo": "/admin/administrative",
        "RH": "/admin/hr",
        "DP": "/admin/pd-department",
        "Financeiro": "/admin/finance",
        "Contabilidade": "/admin/accounting",
        "Fiscal": "/admin/fiscal",
        "TI": "/admin/it",
    };

    const handleRedirect = (title: string) => {
        const baseUrl = "/";
        router.push(routes[title] || baseUrl);
    };

    return (
        <S.Container>
            <AdminHeader />
            <hr />
            <hr />

            {[
                "Usuários",
                "Permissões",
                "Comercial",
                "Administrativo",
                "RH",
                "DP",
                "Financeiro",
                "Contabilidade",
                "Fiscal",
                "TI",
            ].map((title, index) => (
                <button
                    className="card"
                    key={index}
                    onClick={() => handleRedirect(title)}
                >
                    <h2>{title}</h2>
                </button>
            ))}
        </S.Container>
    );
};

export default Admin;

"use client";
import React from "react";
import * as S from "./styles";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/adminHeader/adminHeader";

const Admin: React.FC = () => {
    const router = useRouter();

    const handleRedirect = (title: string) => {
        const baseUrl = "/";
        const routes = {
            Blog: "/admin/blog",
            Usuários: "/admin/user",
            Permissions: "/admin/permissions",
            Commercial: "/admin/commercial",
            Administrative: "/admin/administrative",
            HR: "/admin/hr",
            "DP": "/admin/pd-department",
            Finance: "/admin/finance",
            Accounting: "/admin/accounting",
            Fiscal: "/admin/fiscal",
            IT: "/admin/it",
        };

        
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
                "Blog",
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
"use client";
import React from "react";
import * as S from "./styles";

import { Banner } from "@/components/home/cookies/homeBanner/homeBanner";
import ResetPassword from "@/components/auth/ResetPassword";


const Reset: React.FC = () => {
    return (
        <S.Container>
            <ResetPassword />
        </S.Container>

    )

}
export default Reset;
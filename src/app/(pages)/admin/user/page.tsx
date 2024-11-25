"use client";
import React from "react";
import * as S from "./styles";
import { Banner } from "@/components/home/cookies/homeBanner/homeBanner";
import CreateUser from "@/components/users/create-user/createUser";

const User: React.FC = () => {
    return (
        <S.Container>
              <CreateUser />

        </S.Container>

    )
}
export default User;
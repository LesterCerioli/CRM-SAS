"use client";
import React from "react";
import * as S from "./styles";
import CreateDoctorRegistration from "@/components/createDoctorRegistration/createDoctorRegistration";

const Doctor: React.FC = () => {
    return (
        <S.Container>
            <CreateDoctorRegistration />
        </S.Container>
    )

}
export default Doctor;
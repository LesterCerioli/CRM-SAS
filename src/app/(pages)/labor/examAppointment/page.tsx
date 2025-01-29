"use client";

import React from "react";
import * as S from "./styles";
import { LaborHeader } from "@/components/labor/laborHeader/laborHeader";

import CreateExamForm from "@/components/labor/createExamForm/createExamForm";

const ExamAppointment: React.FC = () => {
    return (
        <S.Container>
            <LaborHeader />
            <h1>Exam Appointment</h1>
            <CreateExamForm />

        </S.Container>
    )

}
export default ExamAppointment;
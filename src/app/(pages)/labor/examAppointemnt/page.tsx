"use client";
import * as S from "./styles";
import React from "react";
import CreateExamForm from "@/components/labor/createExamForm/createExamForm";



const ExamAppointment: React.FC = () => {
    return (
        <S.Container>

            <h1>Exam Appointment</h1>
            <CreateExamForm />

        </S.Container>
    )

}
export default ExamAppointment;
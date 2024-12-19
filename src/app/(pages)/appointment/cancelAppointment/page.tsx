"use client";
import React from "react";
import * as S from "./styles";
import CreateCancelAppointment from "@/components/appointments/createCancelAppointment/createCancelAppointment";
import { AppointmentHeader } from "@/components/appointments/appointmentHeader/appointmentHeader";



const CancelAppointment: React.FC = () => {
    return (
        <S.Container>
            <AppointmentHeader />
            <CreateCancelAppointment/>

        </S.Container>

    )

}
export default CancelAppointment;
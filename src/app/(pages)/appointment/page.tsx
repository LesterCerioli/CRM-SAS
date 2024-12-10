"use client";

import React from "react";
import * as S from "./styles";
import { AppointmentHeader } from "@/components/appointments/appointmentHeader/appointmentHeader";
import CreateAppointmentsForm from "@/components/appointments/createAppointmentsForm/createAppointmentForm";

const Appointment: React.FC = () => {
    return (
        <S.Container>
            <AppointmentHeader />
            <h1>Marcação de Consultas</h1>
            <CreateAppointmentsForm />
        </S.Container>
    );
};

export default Appointment;

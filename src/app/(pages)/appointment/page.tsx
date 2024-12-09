"use client";

import React from "react";
import * as S from "./styles";

import { AppointmentHeader } from "@/components/appointments/appointmentHeader/appointmentHeader";
import ImageHome from "@/components/home/cookies/imageHome/imageHome";

const Appointment: React.FC = () => {
  return (
    <S.Container>
      <AppointmentHeader />
      <ImageHome/>
    </S.Container>
  );
};

export default Appointment;

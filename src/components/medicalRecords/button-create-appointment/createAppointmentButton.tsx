"use client";
import React from "react";
import { Button } from "./styles";

interface CreateNewAppointmentButtonProps {
  onAddNewAppointment: () => void;
}

const CreateNewAppointmentButton: React.FC<CreateNewAppointmentButtonProps> = ({
  onAddNewAppointment,
}) => {
  return (
    <Button onClick={onAddNewAppointment}>Create new appointment</Button>
  );
};

export default CreateNewAppointmentButton;

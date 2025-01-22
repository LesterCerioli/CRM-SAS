"use client";

import React, { useState, useEffect } from "react";
import * as S from "./styles";
import axios from "axios";

const weekdays = ["S", "T", "Q", "Q", "S", "S", "D"];

const CreateAppointmentsForm: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState({
    patientName: "",
    time: "",
    selectedDoctor: "",
  });

  const scheduledAppointment: Record<string, string[]> = {
    "01/12/2024": [
      "Filipe Camarão de Lima: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
      "Ana Lucia da Silva: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
      "Flavio de Oliveira Lima: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
    ],
    "02/12/2024": [
      "Carlos Rodrigues Pereira: 2024-12-02 09:00 consulta com Dr. Carlos - Ortopedista",
    ],
  };

  const  doctors = [
    "Dr. João - Cardiologista",
    "Dra. Maria - Dermatologista",
    "Dr. Carlos - Ortopedista",
    "Dra. Ana - Pediatra",
    "Dr. Pedro - Neurologista",
    "Dra. Luísa - Ginecologista",
    "Dr. Ricardo - Oftalmologista",
    "Dra. Beatriz - Endocrinologista",
    "Dr. Rafael - Urologista",
    "Dra. Sofia - Reumatologista",
    "Dr. Henrique - Psiquiatra",
    "Dra. Clara - Infectologista",
    "Dr. Gustavo - Oncologista",
    "Dra. Juliana - Nefrologista",
    "Dr. Leonardo - Anestesiologista",
    "Dra. Carolina - Hematologista",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); 
    return () => clearInterval(intervalId);
  }, []);

  const getDaysMonths = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const changeMonth = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const validateForm = () => {
    const newErrors = {
      patientName: patientName.trim() ? "" : "Preencha este campo",
      time: time ? "" : "Preencha este campo",
      selectedDoctor: selectedDoctor ? "" : "Preencha este campo",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const data = {
        patientName,
        date: selectedDate?.toLocaleDateString("pt-BR"),
        time,
        doctor: selectedDoctor,
      };
      try {
        const response = await axios.post("https://sua-api.com/endpoint", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setShowForm(false);
        resetForm();
      } catch (error) {
       
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setPatientName("");
    setTime("");
    setSelectedDoctor("");
    setSearchDoctor("");
    setErrors({
      patientName: "",
      time: "",
      selectedDoctor: "",
    });
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const getAppointmentsSummary = (date: Date): string[] => {
    const dateKey = date.toISOString().split("T")[0];
    return scheduledAppointment[dateKey] || [];
  };

  return (
    <S.OuterContainer>
      <S.CalendarContainer>
        <S.TopTabs>
          <S.SideTab />
          <S.CenterTab />
          <S.SideTab />
        </S.TopTabs>
        <S.Container>
          <S.CalendarHeader>
            <S.NavButton onClick={() => changeMonth(-1)}>&lt;</S.NavButton>
            <S.MonthYearContainer>
              <S.MonthDisplay>
                {currentDate.toLocaleString("pt-BR", { month: "long" })}
              </S.MonthDisplay>
              <S.YearSelect
                value={currentDate.getFullYear()}
                onChange={(e) => {
                  const novoAno = parseInt(e.target.value, 10);
                  setCurrentDate((previousDate) => {
                    const novaData = new Date(previousDate);
                    novaData.setFullYear(novoAno);
                    return novaData;
                  });
                }}
              >
                {Array.from({ length: 50 }, (_, i) => i + 2024).map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </S.YearSelect>
            </S.MonthYearContainer>
            <S.NavButton onClick={() => changeMonth(1)}>&gt;</S.NavButton>
          </S.CalendarHeader>
          <div>
            <S.WeekDays>
              {weekdays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </S.WeekDays>
            <S.Days>
              {getDaysMonths(currentDate).map((date, index) =>
                date ? (
                  <S.Day
                    key={index}
                    isToday={isToday(date)}
                    isSelected={selectedDate?.getTime() === date.getTime()}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    {date.getDate()}
                  </S.Day>
                ) : (
                  <div key={index} />
                )
              )}
            </S.Days>
          </div>
        </S.Container>
        {hoveredDate && (
          <S.Tooltip>
            <S.Consultas>
              {getAppointmentsSummary(hoveredDate).length > 0 ? (
                getAppointmentsSummary(hoveredDate).map((appointment, index) => (
                  <div key={index}>{appointment}</div>
                ))
              ) : (
                <div>Sem compromissos agendados</div>
              )}
            </S.Consultas>
          </S.Tooltip>
        )}
        {showForm && (
          <S.FormContainer>
            <S.FormHeader>Scheduling</S.FormHeader>
            <S.InputContainer>
              <S.Input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  setErrors({ ...errors, patientName: "" });
                }}
                style={{ borderColor: errors.patientName ? "red" : "#ccc" }}
              />
              {errors.patientName && (
                <S.ErrorText>{errors.patientName}</S.ErrorText>
              )}
            </S.InputContainer>
            <S.DisabledInput
              value={selectedDate?.toLocaleDateString("pt-BR") || ""}
              disabled
            />
            <S.InputContainer>
              <S.Input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setErrors({ ...errors, time: "" });
                }}
                style={{ borderColor: errors.time ? "red" : "#ccc" }}
              />
              {errors.time && <S.ErrorText>{errors.time}</S.ErrorText>}
            </S.InputContainer>
            <S.InputContainer>
              <div style={{ position: "relative" }}>
                <S.Input
                  type="text"
                  value={searchDoctor}
                  onChange={(e) => {
                    setSearchDoctor(e.target.value);
                    setSelectedDoctor("");
                    setErrors({ ...errors, selectedDoctor: "" });
                  }}
                  onFocus={() => setShowForm(true)}
                  placeholder="Select or enter doctor name"
                  style={{ borderColor: errors.selectedDoctor ? "red" : "#ccc" }}
                />
                {errors.selectedDoctor && (
                  <S.ErrorText>{errors.selectedDoctor}</S.ErrorText>
                )}
                {searchDoctor && filteredDoctors.length > 0 && (
                  <S.Dropdown>
                    {filteredDoctors.map((doctor, index) => (
                      <S.DropdownItem
                        key={index}
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setSearchDoctor(doctor);
                          setErrors({ ...errors, selectedDoctor: "" });
                        }}
                      >
                        {doctor}
                      </S.DropdownItem>
                    ))}
                  </S.Dropdown>
                )}
              </div>
              {selectedDoctor && (
                <S.SelectedMedico>
                  Médico selecionado: {selectedDoctor}
                </S.SelectedMedico>
              )}
            </S.InputContainer>

            <S.ButtonContainer>
              <S.ConfirmButton onClick={handleSubmit}>Confirmar</S.ConfirmButton>
              <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
            </S.ButtonContainer>
          </S.FormContainer>
        )}
      </S.CalendarContainer>
    </S.OuterContainer>
  );
};

export default CreateAppointmentsForm;


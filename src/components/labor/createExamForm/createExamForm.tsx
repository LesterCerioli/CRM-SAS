
"use client";

import React, { useState, useEffect } from "react";
import * as S from "./styles";
import axios from "axios";

const weekdays = ["S", "T", "Q", "Q", "S", "S", "D"];

const CreateExamForm: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [patientName, setPatientName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [time, setTime] = useState("");
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [errors, setErrors] = useState({
        patientName: "",
        time: "",
        selectedCategory: "",
        selectedExam: "",
    });
    const examCategories: ExamCategoriesType = {
        "Blood": [
            "Complete Blood Count",
            "Fasting Blood Glucose",
            "Total Cholesterol and Fractions (LDL, HDL, VLDL)",
            "Triglycerides",
            "Creatinine",
            "Urea",
            "TGO (AST) and TGP (ALT) - Liver Enzymes",
            "Bilirubins (total, direct, and indirect)",
            "Uric Acid",
            "C-Reactive Protein (CRP)",
            "Coagulation Test (TP, TTPA, INR)",
            "Glycated Hemoglobin (HbA1c)",
            "Vitamins (Vitamin D, Vitamin B12, Folic Acid)",
            "Thyroid Hormones (TSH, T3, T4 Free)",
            "Hepatitis Serology (Hepatitis A, B, C)",
            "HIV (Rapid Test, ELISA)",
            "COVID-19 PCR Test"
        ],
        "Urine and Stool": [
            "Urinalysis (EAS)",
            "Urine Culture with Antibiogram",
            "Parasitological Stool Examination",
            "Stool Culture",
            "Fecal Occult Blood Test"
        ],
        "Imaging": [
            "Chest X-ray",
            "Bone and Joint X-ray",
            "Total Abdominal Ultrasound",
            "Transvaginal Ultrasound",
            "Thyroid Ultrasound",
            "Computed Tomography (CT)",
            "Magnetic Resonance Imaging (MRI)",
            "Mammography",
            "Bone Densitometry",
            "Echocardiogram"
        ],
        "Cardiological": [
            "Electrocardiogram (ECG)",
            "Exercise Stress Test",
            "Holter Monitoring (24 Hours)",
            "Ambulatory Blood Pressure Monitoring (ABPM)",
            "Cardiac Catheterization"
        ],
        "Respiratory": [
            "Spirometry (Pulmonary Function Test)",
            "Arterial Blood Gas Analysis",
            "Pulse Oximetry"
        ],
        "Neurological": [
            "Electroencephalogram (EEG)",
            "Electroneuromyography"
        ],
        "Gynecological": [
            "Pap Smear",
            "Colposcopy",
            "Obstetric Ultrasound",
            "Fetal Doppler"
        ]
    };

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
            selectedCategory: selectedCategory ? "" : "Preencha este campo",
            selectedExam: selectedExam ? "" : "Fill field",
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

        setErrors({
            patientName: "",
            time: "",
            selectedCategory: "",
            selectedExam: "",
        });
    };



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
                        <S.InputContainer>
                            <S.Select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedExam("");
                                }}
                            >
                                <option value="">Select Category</option>
                                {Object.keys(examCategories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </S.Select>
                        </S.InputContainer>
                        {selectedCategory && (
                            <S.InputContainer>
                                <S.Select
                                    value={selectedExam}
                                    onChange={(e) => setSelectedExam(e.target.value)}
                                >
                                    <option value="">Select Exam</option>
                                    {examCategories[selectedCategory]?.map((exam) => (
                                        <option key={exam} value={exam}>
                                            {exam}
                                        </option>
                                    ))}
                                </S.Select>
                            </S.InputContainer>
                        )}
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

export default CreateExamForm;



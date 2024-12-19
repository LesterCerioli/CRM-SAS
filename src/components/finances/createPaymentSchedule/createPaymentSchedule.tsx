import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import * as S from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CreatePaymentSchedule: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
        creditorName: '',
        amount: '',
        dueDate: null as Date | null,
        scheduleDate: null as Date | null,
    });
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openDueDate, setOpenDueDate] = useState(false);
    const [openScheduleDate, setOpenScheduleDate] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async () => {
        if (!formData.creditorName || !formData.amount || !formData.dueDate || !formData.scheduleDate) {
            setStatusMessage('Por favor, preencha todos os campos acima.');
            return;
        }

        setIsSubmitting(true);
        setStatusMessage(null);

        try {
            
            const apiUrl = 'https://api.exemplo.com/criar-agendamento';

            const dataToSend = {
                ...formData,
                dueDate: formData.dueDate ? format(formData.dueDate, 'yyyy-MM-dd') : null,
                scheduleDate: formData.scheduleDate ? format(formData.scheduleDate, 'yyyy-MM-dd') : null,
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setStatusMessage('Envio bem-sucedido!');
            } else {
                setStatusMessage('Erro no envio. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            setStatusMessage('Erro no envio. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <S.Container>
            <S.DatePickerStyles />
            <S.FormContainer>
                <S.FieldContainer>
                    <label>
                        Nome do Credor:
                        <input
                            type="text"
                            required
                            value={formData.creditorName}
                            onChange={(e) => setFormData({ ...formData, creditorName: e.target.value })}
                        />
                    </label>

                    <label>
                        Valor em R$:
                        <input
                            type="number"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </label>
                </S.FieldContainer>

                <S.FieldContainer>
                    <label>
                        Data de Vencimento:
                        <DatePicker
                            selected={formData.dueDate}
                            onChange={(date: Date | null) => {
                                setFormData({ ...formData, dueDate: date });
                                setOpenDueDate(false);
                            }}
                            onSelect={() => setOpenDueDate(false)}
                            open={openDueDate}
                            onClickOutside={() => setOpenDueDate(false)}
                            onFocus={() => setOpenDueDate(true)}
                            dateFormat="dd/MM/yyyy"
                            locale={ptBR}
                            placeholderText="DD/MM/YYYY"
                            className="datepicker-input"
                        />
                    </label>

                    <label>
                        Data de Agendamento:
                        <DatePicker
                            selected={formData.scheduleDate}
                            onChange={(date: Date | null) => {
                                setFormData({ ...formData, scheduleDate: date });
                                setOpenScheduleDate(false);
                            }}
                            onSelect={() => setOpenScheduleDate(false)}
                            open={openScheduleDate}
                            onClickOutside={() => setOpenScheduleDate(false)}
                            onFocus={() => setOpenScheduleDate(true)}
                            required
                            dateFormat="dd/MM/yyyy"
                            locale={ptBR}
                            placeholderText="DD/MM/YYYY"
                            className="datepicker-input"
                        />
                    </label>
                </S.FieldContainer>

                <S.FileUploadContainer>
                    <div>
                        <p>Anexar Boleto:</p>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={() => {}} />
                    </div>
                </S.FileUploadContainer>

                <S.SubmitButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </S.SubmitButton>

                {statusMessage && (
                    <p style={{ marginTop: '10px', color: statusMessage === 'Envio bem-sucedido!' ? 'green' : 'red' }}>
                        {statusMessage}
                    </p>
                )}
            </S.FormContainer>
        </S.Container>
    );
};

export default CreatePaymentSchedule;

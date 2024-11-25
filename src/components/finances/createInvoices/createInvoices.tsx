import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import * as S from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const CreateInvoices: React.FC = () => {
  const [formData, setFormData] = useState({
    creditorName: '',
    dueDate: null as Date | null,
    amount: '',
    status: '',
    file: null as File | null,
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, file });
    } else {
      alert("Faça upload de um arquivo PDF.");
      e.target.value = ''; 
    }
  };

  const handleSubmit = async () => {
    if (!formData.creditorName || !formData.dueDate || !formData.amount || !formData.file || formData.status === '') {
      setStatusMessage('Por favor, preencha os campos.');
      return;
    }
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const apiUrl = 'https://api.exemplo.com/create-invoice';
      const dataToSend = {
        nomeCredor: formData.creditorName,
        dataDeVencimento: formData.dueDate ? format(formData.dueDate, 'yyyy-MM-dd') : null,
        valor: formData.amount,
        status: formData.status === 'paid',
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSend));
      formDataToSend.append('file', formData.file as Blob);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
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

  return (
    <>
      <S.Container>
        <S.DatePickerStyles />
        <S.FormContainer>
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
            Valor do Pagamento:
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </label>
          <label>
            Data de Vencimento:
            <DatePicker
              selected={formData.dueDate}
              onChange={(date: Date | null) => {
                setFormData({ ...formData, dueDate: date });
                setCalendarOpen(false); 
              }}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              placeholderText="DD/MM/AAAA"
              className="datepicker-input"
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
              onFocus={() => setCalendarOpen(true)}
            />
          </label>
          <label>
            Status:
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="" disabled>Selecione</option>
              <option value="notPaid">Não Pago</option>
              <option value="paid">Pago</option>
            </select>
          </label>
          <S.FileUploadContainer>
            <label>
              Anexar arquivo:
              <input type="file" accept=".pdf" onChange={handleFileChange} />
            </label>
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
    </>
  );
};

export default CreateInvoices;

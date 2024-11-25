"use client"
import React, { useState } from 'react';
import * as S from './styles';


const CreateBillet: React.FC = () => {
    const [formData, setFormData] = useState({
        issuerName: '',
        cnpj: '',
        cpType: '',
        amount: '',
        file: null as File | null,
    });
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validateCNPJ = (cnpj: string) => {
        const regexFormatted = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        const regexUnformatted = /^\d{14}$/;
        return regexFormatted.test(cnpj) || regexUnformatted.test(cnpj);
    };
    const handleSubmit = async () => {
        if (!formData.issuerName || !formData.cnpj || !formData.amount || !formData.file) {
            setStatusMessage('Por favor, preencha todos os campos corretamente.');
            return;
        }
        if (!validateCNPJ(formData.cnpj)) {
            setStatusMessage('CNPJ inválido.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage(null);
        try {
            const apiUrl = 'https://api.exemplo.com/cadastrar-comprovante';
            const dataToSend = {
                issuerName: formData.issuerName,
                cnpj: formData.cnpj,
                cpType: formData.cpType,
                amount: formData.amount,
            };
            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify(dataToSend));
            formDataToSend.append('file', formData.file);
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataToSend,
            });
            setStatusMessage(response.ok ? 'Envio bem-sucedido!' : 'Erro no envio. Tente novamente.');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            setStatusMessage('Erro no envio. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <S.Container>
            <S.FormContainer>
                <S.FieldContainer>
                    <label>
                        Nome do Emissor:
                        <input
                            type="text"
                            required
                            value={formData.issuerName}
                            onChange={(e) => setFormData({ ...formData, issuerName: e.target.value })}
                        />
                    </label>
                    <label>
                        CNPJ:
                        <input
                            type="text"
                            required
                            value={formData.cnpj}
                            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                            placeholder="00.000.000/0000-00"
                        />
                    </label>
                    <label>
                        Tipo de Comprovante:
                        <select
                            required
                            value={formData.cpType}
                            onChange={(e) => setFormData({ ...formData, cpType: e.target.value })}
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="cupons">Cupons</option>
                            <option value="nota_fiscal">Nota Fiscal</option>
                            <option value="ordem_servico">Ordem de Serviço</option>
                        </select>
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
                <S.FileUploadContainer>
    <label htmlFor="fileUpload">Anexar Arquivo:</label>
    <input
        id="fileUpload"
        type="file"
        accept=".doc,.png,.jpg,.pdf"
        required
        onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFormData({ ...formData, file });
        }}
    />
</S.FileUploadContainer>
                <S.SubmitButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </S.SubmitButton>
                {statusMessage && (
                    <S.StatusMessage success={statusMessage === 'Envio bem-sucedido!'}>
                        {statusMessage}
                    </S.StatusMessage>
                )}
            </S.FormContainer>
        </S.Container>
    );
};
export default CreateBillet;

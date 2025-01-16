'use client'

import React, { useState } from 'react';
import { Upload, Paperclip } from 'lucide-react';
import * as S from './styles';

interface LaboratoryModuleProps {
  patientId?: string;
  onUpload?: (file: File, type: 'exam' | 'document') => Promise<void>;
}

const LaboratoryModule: React.FC<LaboratoryModuleProps> = ({ patientId, onUpload }) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'documents'>('exams');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'exam' | 'document') => {
    const file = event.target.files?.[0];
    if (!file || !onUpload) return;

    try {
      setUploading(true);
      await onUpload(file, type);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>Laboratório</S.Header>
      <S.TabsContainer>
        <S.Tab
          $active={activeTab === 'exams'}
          onClick={() => setActiveTab('exams')}
        >
          Exames
        </S.Tab>
        <S.Tab
          $active={activeTab === 'documents'}
          onClick={() => setActiveTab('documents')}
        >
          Outros Documentos
        </S.Tab>
      </S.TabsContainer>

      <S.Content>
        {activeTab === 'exams' ? (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>
                <Paperclip size={16} />
                Exames
              </S.SectionTitle>
              <S.Counter>8</S.Counter>
            </S.SectionHeader>
            <S.UploadContainer>
              <S.UploadLabel htmlFor="exam-upload">
                <Upload size={20} />
                Upload de Exame
                <S.UploadInput
                  id="exam-upload"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'exam')}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                />
              </S.UploadLabel>
            </S.UploadContainer>
            <S.FileList>
              
            </S.FileList>
          </S.Section>
        ) : (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>
                <Paperclip size={16} />
                Outros Documentos
              </S.SectionTitle>
              <S.Counter>0</S.Counter>
            </S.SectionHeader>
            <S.UploadContainer>
              <S.UploadLabel htmlFor="document-upload">
                <Upload size={20} />
                Upload de Documento
                <S.UploadInput
                  id="document-upload"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'document')}
                  accept=".pdf,.doc,.docx"
                  disabled={uploading}
                />
              </S.UploadLabel>
            </S.UploadContainer>
            <S.FileList>
             
            </S.FileList>
          </S.Section>
        )}
      </S.Content>
    </S.Container>
  );
};

export default LaboratoryModule;


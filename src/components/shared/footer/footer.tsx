"use client"
import * as S from "./styles";

export const Footer: React.FC = () => {
    const currentYear: number = new Date().getFullYear();

    return (
        <S.Container>
            <S.SpanContainer>
                <S.Brand>Medical App</S.Brand>
                <S.Copyright>
                    Todos os direitos reservados © {currentYear}
                </S.Copyright>
            </S.SpanContainer>
        </S.Container>
    );
};
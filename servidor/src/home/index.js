import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${cep}/json/`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite a Matícula do Aluno.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite a Matícula do Aluno');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setCep('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={setMatricula}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite a matrícula do Aluno que deseja encontrar."
                        placeholderTextColor="#2F48D4"
                        value={matricula}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={matricula ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {matricula &&
                <setMatricula>
                    <Text>Nome: {matricula.Nome}</Text>
                    <Text>CPF: {matricula.CPF}</Text>
                    <Text>Bairro: {matricula.Telefone}</Text>
                    <Text>Cidade: {matricula.Matricula}</Text>
                </setMatricula>
            }
        </Container>
    );
}
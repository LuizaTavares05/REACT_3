import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";

const schemaAluno = yup
  .object({
    nome: yup.string().required("O nome é obrigatório"),
    matricula: yup.string().required("A matrícula é obrigatória"),
    curso: yup.string().required("O curso é obrigatório"),
  })
  .required();

export default function CriarAluno({ navigation }: any) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAluno),
    defaultValues: {
      nome: "",
      matricula: "",
      curso: "",
    },
  });

  const cadastrarAluno = async (data: any) => {
    try {
      const response = await api.post("/alunos", data);
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
        if (navigation) navigation.navigate("HomeAlunos");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      Alert.alert("Erro", "Não foi possível conectar a API");
    }
  };

  return (
    <SafeAreaView style={styles.criarWrapper}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.criarTitle}>Cadastrar Novo Aluno</Text>

            <View style={styles.formulario}>
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do Aluno"
                    placeholderTextColor="#9ca3af"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.nome && (
                <Text style={styles.erroMensagem}>{errors.nome.message}</Text>
              )}

              <Controller
                control={control}
                name="matricula"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Matrícula"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric" 
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.matricula && (
                <Text style={styles.erroMensagem}>{errors.matricula.message}</Text>
              )}

              <Controller
                control={control}
                name="curso"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Curso"
                    placeholderTextColor="#9ca3af"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.curso && (
                <Text style={styles.erroMensagem}>{errors.curso.message}</Text>
              )}

              <TouchableOpacity
                style={styles.btnSalvar}
                onPress={handleSubmit(cadastrarAluno)}
                activeOpacity={0.7}
              >
                <Text style={styles.btnSalvarTexto}>Salvar novo Aluno</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  criarWrapper: {
    flex: 1,
    backgroundColor: "#f3f4f6", 
  },
  scrollContainer: {
    flexGrow: 1, // Garante o comportamento correto de rolagem interna
    padding: 20,
    justifyContent: "center", // Deixa o formulário centralizado se sobrar espaço
  },
  criarTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: 20,
    textAlign: "center",
  },
  formulario: {
    width: "100%",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#1e3a5f",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20, // Margem inferior extra para não colar no fim da rolagem
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#f9fafb",
    color: "#000000",
    marginBottom: 14,
  },
  btnSalvar: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  btnSalvarTexto: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  erroMensagem: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
    marginTop: -8,
    marginBottom: 14,
    textAlign: "left",
  },
});
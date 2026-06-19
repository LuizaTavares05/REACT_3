import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const schemaAluno = yup
  .object({
    nome: yup.string().required("O nome é obrigatório"),
    matricula: yup.string().required("A matrícula é obrigatória"),
    curso: yup.string().required("O curso é obrigatório"),
  })
  .required();

export default function CriarAluno({ navigation }: any) {
  const { cores } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
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
        reset({
          nome: "",
          matricula: "",
          curso: "",
        });

        Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
        navigation.navigate("ListarAlunosTab");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      Alert.alert("Erro", "Não foi possível conectar a API");
    }
  };

  return (
    <View style={[styles.criarWrapper, { backgroundColor: cores.background }]}>
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
            <Text style={[styles.criarTitle, { color: cores.texto }]}>Cadastrar Novo Aluno</Text>

            <View style={[styles.formulario, { backgroundColor: cores.card, borderColor: cores.borda }]}>
              
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
                    placeholder="Nome do Aluno"
                    placeholderTextColor={cores.textoSecundario}
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
                    style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
                    placeholder="Matrícula"
                    placeholderTextColor={cores.textoSecundario}
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
                    style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
                    placeholder="Curso"
                    placeholderTextColor={cores.textoSecundario}
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
    </View>
  );
}

const styles = StyleSheet.create({
  criarWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, 
    padding: 20,
    justifyContent: "center",
  },
  criarTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  formulario: {
    width: "100%",
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: 14,
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
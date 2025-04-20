import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";

type FormTextFieldProps<T extends FieldValues> = TextInputProps &
  UseControllerProps<T>;

const FormTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormTextFieldProps<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        {...props}
      />
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

FormTextField.displayName = "FormTextField";

export { FormTextField };

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
  },
});

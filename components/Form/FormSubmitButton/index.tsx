import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

export type FormSubmitButtonProps<T extends FieldValues> =
  TouchableOpacityProps & {
    onSubmit: SubmitHandler<T>;
    title: string;
  };

const FormSubmitButton = <T extends FieldValues>({
  onSubmit,
  style,
  title,
  ...props
}: FormSubmitButtonProps<T>) => {
  const { handleSubmit, formState } = useFormContext<T>();
  const isLoading = formState.isSubmitting;
  const isDisabled = isLoading || props.disabled;

  return (
    <TouchableOpacity
      onPress={handleSubmit(onSubmit)}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      {...props}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="white" />
          <Text style={[styles.text, isDisabled && styles.textDisabled]}>
            Loading...
          </Text>
        </View>
      ) : (
        <Text style={[styles.text, isDisabled && styles.textDisabled]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  textDisabled: {
    color: "#e0e0e0",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

FormSubmitButton.displayName = "FormSubmitButton";

export { FormSubmitButton };

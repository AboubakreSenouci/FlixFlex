import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
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

  return (
    <TouchableOpacity
      onPress={handleSubmit(onSubmit)}
      disabled={formState.isSubmitting || props.disabled}
      style={style}
      {...props}
    >
      <Text style={{ color: props.disabled ? "gray" : "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

FormSubmitButton.displayName = "FormSubmitButton";

export { FormSubmitButton };

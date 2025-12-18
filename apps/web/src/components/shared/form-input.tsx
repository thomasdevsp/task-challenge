import { type ControllerFieldState, type ControllerRenderProps, type FieldValues, type Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

interface FormInputProps<TFieldValues extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  fieldState: ControllerFieldState
}

export function FormInput<TFieldValues extends FieldValues>({ name, label, field, fieldState, ...props }: FormInputProps<TFieldValues>) {

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-rhf-demo-title">
        {label}
      </FieldLabel>

      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}

      <Input
        {...field}
        id="form-rhf-demo-title"
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        {...props}
        className="bg-[#333438] opacity-50 focus:bg-[#4a4b4f] focus:opacity-100"
      />

    </Field>
  )
}

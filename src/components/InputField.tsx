import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

interface InputFieldProps {
  placeholder: string;
  type?: "text" | "email" | "password" | "number" | "date";
  value: any;
  onChange: (e: any) => void;
  textarea?;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const I = props.textarea ? Textarea : Input;

  return (
    <FormControl mb="4">
      <FormLabel>{props.children}</FormLabel>
      <I
        placeholder={props.placeholder}
        id={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        required
      />
    </FormControl>
  );
};

export default InputField;

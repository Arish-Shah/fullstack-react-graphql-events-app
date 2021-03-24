import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface InputFieldProps {
  placeholder: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: any) => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <FormControl mb="4">
      <FormLabel>{props.children}</FormLabel>
      <Input
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

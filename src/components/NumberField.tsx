import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
} from "@chakra-ui/number-input";

interface NumberFieldProps {
  placeholder: string;
  value: any;
  onChange: (e: any) => void;
}

const NumberField: React.FC<NumberFieldProps> = (props) => {
  return (
    <FormControl mb="4">
      <FormLabel>{props.children}</FormLabel>
      <NumberInput
        precision={2}
        step={0.2}
        value={props.value}
        onChange={(val) => props.onChange(val)}
      >
        <InputGroup>
          <InputLeftAddon children="$" />
          <Input
            type="number"
            placeholder={props.placeholder}
            id={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </InputGroup>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default NumberField;

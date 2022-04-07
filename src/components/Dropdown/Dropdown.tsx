import {FunctionComponent, h} from "preact";
import styled from "styled-components";

interface Item<T> {
    value: T;
    label: string;
}

interface Props<T> {
    data: Item<T>[];
    value: string | number;
    placeholder?: string;
    label?: string;
    onChange: (item: T) => void;
    className?: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;
  
  label {
    font-size: ${props => props.theme.fontSizes.small};
    position: absolute;
    top: -17px;
  }
`;
const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: ${props => props.theme.colors.brand2};
  padding: 0 1em;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: bold;
  border: 1px solid ${props => props.theme.colors.brand2};
  border-radius: 5px;

  &:focus {
    outline: none;
  }
  
  option {
    font-weight: bold;
    display: flex;
    white-space: pre;
    min-height: 100px !important;
    padding: 5px;
  }
`;
const Dropdown = <T extends unknown>({data, onChange, value, className, label}: Props<T>): ReturnType<FunctionComponent> => {
    const handleChange = (e: { target: { value: T } }) => {
        const value = e.target.value;
        if (value) {
            onChange(value);
        }
    }

    return (
        <Root className={className}>
            {label && <label>{label}</label>}
            <Select value={value} onChange={handleChange} >
                {data.map(item => {
                    return (
                        <option key={item.value} value={item.value as string}>{item.label}</option>
                    )
                })}
            </Select>
        </Root>)
}

export default Dropdown;
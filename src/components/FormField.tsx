import styled from 'styled-components'

const FormField: React.FC<{
  label: string
  type: string
  name: string
  placeholder: string
  required?: boolean
}> = ({ label, type, name, placeholder, required }) => {
  return (
    <FormFieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} required />
    </FormFieldContainer>
  )
}

export default FormField

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  border-top: 1px solid var(--clr-primary-5);

  &:first-of-type {
    border-top: none;
  }
`

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  color: var(--clr-primary-1);
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid var(--clr-primary-5);
`

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  color: var(--clr-primary-3);
  background-color: transparent;
  animation: 1ms void-animation-out;

  && {
    border-radius: 0;
    margin-bottom: 0;
    background: transparent;
    border: transparent;
  }

  &::placeholder {
    color: var(--clr-primary-9);
  }

  /* to change the background color of auto-fill row in Chrome */
  && {
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px var(--clr-primary-9) inset;
      -webkit-text-fill-color: var(--clr-primary-5);
    }
  }
`

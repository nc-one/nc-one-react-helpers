export const required = (value: string, text?: string): string | undefined => {
    if (!value) return text || 'Wymagane';
  };
  
  export const invalidEmail = (value: string, text?: string): string | undefined => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return text || 'Nieprawidłowy e-mail';
  };
  
  export const invalidPassword = (value: string, text?: string): string | undefined => {
    if (!/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(value)) return text || 'Hasło jest zbyt proste';
  };
  
  export const matchPassword = (password: string, rePassword: string, text?: string): string | undefined => {
    if (password && password !== rePassword) return text || 'Hasła nie pasują';
  };
  
  export const positiveNumber = (value: number, text?: string): string | undefined => {
    if (+value < 0) return text || 'Liczba nie może być ujemna';
  };

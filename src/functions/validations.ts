export const required = (value: string): string | undefined => {
    if (!value) return 'Wymagane';
  };
  
  export const invalidEmail = (value: string): string | undefined => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Nieprawidłowy e-mail';
  };
  
  export const invalidPassword = (value: string): string | undefined => {
    if (!/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(value)) return 'Hasło jest zbyt proste';
  };
  
  export const matchPassword = (password: string, rePassword: string): string | undefined => {
    if (password && password !== rePassword) return 'Hasła nie pasują';
  };
  
  export const positiveNumber = (value: number): string | undefined => {
    if (+value < 0) return 'Liczba nie może być ujemna';
  };

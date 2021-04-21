# nc-one-react-helpers

###### Наработки фронтендеров компани [NC1](https://nc-one.com/)

`npm i nc-one-react-helpers` или `yarn add nc-one-react-helpers`

# Документация:

## 1. Компоненты:

### 1.1. DateTimePicker:

![](https://github.com/nc-one/nc-one-react-helpers/blob/master/demo/DateTimePicker.png?raw=true)

**Импорт:**
```typescript
import { DateTimePicker } from 'nc-one-react-helpers'
```

**Пример использования:**
```typescript
<DateTimePicker
	date={new Date()}
	onDateTimeChange={(date) => console.log(date)}
	getDateTimeString={(date) => console.log(date)}
	format='MMMM DD, YYYY - hh:mm'
/>
```

**Интерфейс:**
```typescript
interface DateTimePickerProps extends ITextFieldProps {
	date?: Date
	stringDate?: string
	format?: string
	withIcon?: boolean
	onDateTimeChange?: (date?: Date) => void
	getDateTimeString?: (date?: string) => void
	CalendarStrings?: ICalendarStrings
}
```

| Название  | Тип  | Дефолтное значение | Описание |
|:-----------------:|:---------------:|:-------------:|:------------------------------------------------------------:|
|           date  | Date | undefined | Дата и время которые будут записаны и выбраны автоматически |
| stringDate  | string  | undefined | Дата и время которые будут записаны и выбраны автоматически в виде строки (строка должна быть в таком же формате что и format) |
| format | string | "MM.DD.YYYY, hh:mma" | Формат строки в котором будет отображаться и выводиться дата время подробнее [здесь](https://momentjs.com/) |
| withIcon | boolean | true | Будет ли показываться иконка даты времени |
| onDateTimeChange | (date?: Date) => void | undefined | Делать что-то с датой временем при каждом изменении |
| getDateTimeString | [ICalendarStrings](https://developer.microsoft.com/en-us/fluentui#/controls/web/references/datetimeutilities#ICalendarStrings) | [initialCalendarStrings](https://github.com/nc-one/nc-one-react-helpers/blob/master/demo/initialCalendarStrings.png?raw=true) | То как будут отображаться строки [календаря](https://developer.microsoft.com/en-us/fluentui#/controls/web/calendar) |

`DateTimePickerProps` наследуется от [`ITextFieldProps`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield#ITextFieldProps), поэтому все пропсы [`TextField`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield) будут прекрасно работать!

## 2. Хуки:

### 2.1. useMediaQuery:

**Импорт:**
```typescript
import { useMediaQuery } from 'nc-one-react-helpers'
```

**Пример использования:**
```typescript
const matches = useMediaQuery('(min-width: 800px)')

if (matches) return <>Ширина экрана больше 800px</>
else return <>Ширина экрана 800px или меньше</>
```

**Тип:**
```typescript
type useMediaQuery = (query: string) => boolean
```

Принимает строку как в css [`@usemedia`](https://developer.mozilla.org/ru/docs/Web/CSS/@media) и возвращает `true` в случае если ширина экрана удовлетворяет условие или `false` в противном случае.

## 3. Различные вспомагательные элементы:

### 3.1. функции:

#### 3.1.1. UTCHoursPlus:

**Импорт:**
```typescript
import { UTCHoursPlus } from 'nc-one-react-helpers'
```

**Пример использования:**
```typescript
export const Time: React.FC = () => {
    const [time, setTime] = useState('')

    setTimeout(() => setTime(`${UTCHoursPlus(1)}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`), 1000)

    return <>Storage time: {time} (UTC+01:00)</>
}
```

**Тип:**
```typescript
type UTCHoursPlus = (plus: number) => number
```

Принимает то насколько увеличить текущее время и возвращает часы UTC+ввёдый параметр

#### 3.1.2. sleep:

**Импорт:**
```typescript
import { sleep } from 'nc-one-react-helpers'
```

**Пример использования:**
```typescript
onSubmit={async (values) => {
     setProgressIndicator(true);  // показать спинер

    try {
        sleep(500) // подождать 500 милисекунд
        // сделать имитацию запроса на сервер
    } catch (e) {
        console.log(e)
    } finally {
        setProgressIndicator(false) // скрыть спинер
    }
}}
```

**Тип:**
```typescript
type sleep = (ms: number) => Promise<unknown>
```

Подождать введённое количество милисекунд, и только потом выполнить код ниже

## 3.2. Валидации:

**Импорт:**
```typescript
import { required, invalidEmail, invalidPassword, matchPassword, positiveNumber } from 'nc-one-react-helpers'
```

**Типы:**
```typescript
type required = (value: string, text?: string | undefined) => string | undefined

type invalidEmail = (value: string, text?: string | undefined) => string | undefined

type invalidPassword = (value: string, text?: string | undefined) => string | undefined

type matchPassword = (password: string, rePassword: string, text?: string | undefined) => string | undefined

type positiveNumber = (value: number, text?: string | undefined) => string | undefined
```

**Пример использования:**
```typescript
validate={({ email, position, password, repassword }) => {
    if (
        !required(email) &&
        !invalidEmail(email) &&
        !required(position) &&
        !positiveNumber(position) &&
        !required(password) &&
        !invalidPassword(password) &&
        !required(repassword) &&
        !invalidPassword(repassword) &&
        !matchPassword(password, repassword)
    ) return {};

    return {
        email: required(email) || invalidEmail(email),
        position: required(position) || positiveNumber(position),
        password: required(password) || invalidPassword(password),
        repassword: required(repassword) || invalidPassword(repassword) || matchPassword(password, repassword)
    };
}}
```

- `required` - Принимает `value` и возвращает текст ошибки в случае если `value` пустой или `undefined` в противном случае.
- `invalidEmail` - Принимает `value` и возвращает текст ошибки в случае если `value` не является валидным почтовым адресом (email) или `undefined` в противном случае.
- `invalidPassword` - Принимает `value` и возвращает текст ошибки в случае если `value` не проходит проверку валидации (слишком простой) или `undefined` в противном случае.
        
***валидация пароля:** минимум 8 символов, минимум 1 латинская буква A-Za-z, минимум 1 цифра 0-9*
- `matchPassword` - Принимает `password` и `rePassword` и возвращает текст ошибки в случае если пароли не совпадают или `undefined` в противном случае.
-  `positiveNumber` - Принимает число и возвращает текст ошибки в случае если оно отрицательное или `undefined` в противном случае.
     
`text` - Необязательный параметр всех валидаций. Он отвечает за то каким будет сообщение об ошибке. Если он не указан будет выведено сообщение по умолчанию (на Польском)

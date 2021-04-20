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
	date?: Date;
	stringDate?: string;
	format?: string;
	withIcon?: boolean;
	onDateTimeChange?: (date?: Date) => void;
	getDateTimeString?: (date?: string) => void;
	CalendarStrings?: ICalendarStrings;
}
```
| Название  | Тип  | Дефолтное значение | Описание |
| :----------------- |:---------------:||:-------------:|:------------------------------------------------------------:|
| date  | Date | undefined | Дата и время которые будут записаны и выбраны автоматически |
| stringDate  | string  | undefined | Дата и время которые будут записаны и выбраны автоматически в виде строки (строка должна быть в таком же формате что и format) |
 | format | string | "MM.DD.YYYY, hh:mma" | Формат строки в котором будет отображаться и выводиться дата время подробнее [здесь](https://momentjs.com/) |
| withIcon | boolean | true | Будет ли показываться иконка даты времени |
| onDateTimeChange | (date?: Date) => void | undefined | Делать что-то с датой временем при каждом изменении |
| getDateTimeString | [ICalendarStrings](https://developer.microsoft.com/en-us/fluentui#/controls/web/references/datetimeutilities#ICalendarStrings) | [initialCalendarStrings](https://github.com/nc-one/nc-one-react-helpers/blob/master/demo/initialCalendarStrings.png?raw=true) | То как будут отображаться строки [календаря](https://developer.microsoft.com/en-us/fluentui#/controls/web/calendar) |
`DateTimePickerProps` наследуется от [`ITextFieldProps`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield#ITextFieldProps), поэтому все пропсы [`TextField`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield) будут прекрасно работать!
# Документация будет дополняться

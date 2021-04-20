import React, { useEffect, useState } from 'react';
import '../../styles/DateTimePicker.css';
import { TextField, ITextFieldProps, ICalendarStrings, Calendar, initializeIcons } from '@fluentui/react';
import moment from 'moment';

initializeIcons();

const initialCalendarStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month'
};

export const DateTimePicker: React.FC<DateTimePickerProps> = React.memo(
  ({ date, stringDate, format, withIcon, onDateTimeChange, getDateTimeString, CalendarStrings, ...rest }: DateTimePickerProps): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState(date || stringDate ? new Date(moment(stringDate, format || 'MM.DD.YYYY, hh:mma').format('YYYY-MM-DDThh:mm:ss.sss')) : undefined);
    const [showCalendar, setShowCalendar] = useState(false);

    const nowDate = new Date();

    useEffect(() => {
      onDateTimeChange && onDateTimeChange(selectedDate);

      getDateTimeString && getDateTimeString(selectedDate ? moment(selectedDate).format(format || 'MM.DD.YYYY, hh:mma') : '');
    }, [selectedDate]);

    return (
      <div className='DateTimePicker'>
        <TextField
          className='DateTimePicker__input'
          iconProps={withIcon !== false ? { iconName: 'DateTime' } : undefined}
          value={selectedDate ? moment(selectedDate).format(format || 'MM.DD.YYYY, hh:mma') : ''}
          readOnly
          onClick={() => setShowCalendar(true)}
          {...rest}
        />
        {showCalendar && (
          <div className='DateTimeSelector'>
            <button className='DateTimeSelector__ok-button' onClick={() => setShowCalendar(false)}>
              OK
            </button>
            <Calendar
              className='DateTimeSelector__date'
              strings={CalendarStrings || initialCalendarStrings}
              value={selectedDate!}
              isDayPickerVisible
              isMonthPickerVisible
              showGoToToday
              showMonthPickerAsOverlay
              onSelectDate={(date) => {
                setSelectedDate(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    selectedDate ? selectedDate.getHours() : nowDate.getHours(),
                    selectedDate ? selectedDate.getMinutes() : nowDate.getMinutes()
                  )
                );
              }}
            />
            <div className='DateTimeSelector__time'>
              <div className='DateTimeSelector__hours DateTimeSelector__time-item'>
                <TimeColumn selectedDate={selectedDate} setSelectedDate={setSelectedDate} type='hours' />
              </div>
              <div className='DateTimeSelector__minutes DateTimeSelector__time-item'>
                <TimeColumn selectedDate={selectedDate} setSelectedDate={setSelectedDate} type='minutes' />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

const TimeColumn: React.FC<TimeColumnProps> = ({ type, selectedDate, setSelectedDate }: TimeColumnProps): JSX.Element => {
  const date = selectedDate || new Date();
  const selectedItem = type === 'hours' ? date.getHours() : date.getMinutes();
  const currentItem = type === 'hours' ? new Date().getHours() : new Date().getMinutes();

  const [centerItem, setCenterItem] = useState(selectedItem);
  const [renderItems, setRenderItems] = useState<number[]>([]);
  const [rerender, setRerender] = useState(false);
  const [savedSwipeY, setSavedSwipeY] = React.useState(0);

  setTimeout(() => setRerender(!rerender), 1000);

  useEffect(() => {
    const maxItem = type === 'hours' ? 23 : 59;
    const newRenderItems: number[] = [];

    for (let i = -3; i <= 3; i++) {
      if (centerItem + i === -3) newRenderItems.push(maxItem - 2);
      else if (centerItem + i === -2) newRenderItems.push(maxItem - 1);
      else if (centerItem + i === -1) newRenderItems.push(maxItem);
      else if (centerItem + i === maxItem + 3) newRenderItems.push(2);
      else if (centerItem + i === maxItem + 2) newRenderItems.push(1);
      else if (centerItem + i === maxItem + 1) newRenderItems.push(0);
      else newRenderItems.push(centerItem + i);
    }

    if (centerItem > maxItem) setCenterItem(0);

    if (centerItem < 0) setCenterItem(maxItem);

    setRenderItems(newRenderItems);
  }, [centerItem]);

  const swipe = (swipeY: number) => {
    if (swipeY - savedSwipeY >= 32.85) {
      setSavedSwipeY(swipeY);
      setCenterItem((prevCenterItem) => prevCenterItem - 1);
    } else if (swipeY - savedSwipeY <= -32.85) {
      setSavedSwipeY(swipeY);
      setCenterItem((prevCenterItem) => prevCenterItem + 1);
    }
  };

  return (
    <div
      className='column'
      onKeyDown={(e) => (e.key === 'ArrowUp' ? setCenterItem((prevCenterItem) => prevCenterItem + 1) : e.key === 'ArrowDown' && setCenterItem((prevCenterItem) => prevCenterItem - 1))}
      onTouchMove={(e) => swipe(e.targetTouches[0].clientY)}
      onTouchStart={(e) => setSavedSwipeY(e.targetTouches[0].clientY)}
      onWheel={(e) => (e.deltaY > 0 ? setCenterItem((prevCenterItem) => prevCenterItem + 1) : setCenterItem((prevCenterItem) => prevCenterItem - 1))}
    >
      {renderItems.map((item) => {
        const isSelected = (selectedDate && selectedItem === item) || (selectedDate && selectedItem === item);

        const onSelect = () => {
          if (type === 'hours') setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), item, date.getMinutes()));
          else setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), item));
        };

        return (
          <button key={item} className={`column__button ${isSelected && 'column__button_selected'} ${currentItem === item && 'column__button_current'}`} onClick={onSelect}>
            <p>{`${item}`.length === 2 ? item : `0${item}`}</p>
          </button>
        );
      })}
    </div>
  );
};

interface DateTimePickerProps extends ITextFieldProps {
  date?: Date;
  stringDate?: string;
  format?: string;
  withIcon?: boolean;
  onDateTimeChange?: (date?: Date) => void;
  getDateTimeString?: (date?: string) => void;
  CalendarStrings?: ICalendarStrings;
};

type TimeColumnProps = {
  type: 'minutes' | 'hours';
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

import React, { ReactElement, useState } from 'react';
import { getTextByLanguage } from '../../../i18n/i18n';
import formatDate from '../../../utils/utilsFunction/date-converter';
import NepaliDatePicker from '../Datepicker/Datepicker'
import EnglishDatePicker from '../EnglishDatepicker/EnglishDatepicker';

interface ComboDateProps {
    nameEn: string;
    valueEn: string;
    setValue: (name: any, date: any) => void;
    onChangeCustom?: (date: string, datenp: string) => void;

    disabled?: boolean;

    nameNe: string;
    valueNe: string;

    maxDateToday?: boolean;
    maxDateEn?: string | Date;
    minDateEn?: string | Date;

    minDateToday?: boolean;
    maxDateNe?: string;
    minDateNe?: string;
}

function ComboDate(props: ComboDateProps): ReactElement {
    const { nameEn, valueEn, setValue, onChangeCustom, nameNe, valueNe, maxDateToday, minDateToday, disabled = false, maxDateEn = "", maxDateNe = "", minDateEn = "", minDateNe = "" } = props;

    const [bsDate, setbsDate] = useState(true);

    return (
        <>
            <EnglishDatePicker
                name={nameEn}
                value={valueEn}
                handleChange={(date) => {
                    setValue(nameEn, formatDate(date))
                }}
                maxDate={maxDateEn ? new Date(maxDateEn) : (maxDateToday ? new Date() : "")}
                minDate={minDateEn ? new Date(minDateEn) : (minDateToday ? new Date() : "")}
                className="form-control"
                disabled={disabled}
            />
            <NepaliDatePicker
                name={nameNe}
                value={valueNe}
                engDate={valueEn}
                onChange={(datenp, dateen) => {
                    setValue(nameNe, datenp)
                    setValue(nameEn, formatDate(dateen))

                    onChangeCustom && onChangeCustom(formatDate(dateen), datenp);
                }}
                className="form-control"
                wrapperClassName={!bsDate ? "d-none" : ""}
                maxDateToday={maxDateToday}
                minDateToday={minDateToday}
                maxDate={maxDateNe}
                minDate={minDateNe}
                disabled={disabled}
            />
        </>
    )
}

export default ComboDate

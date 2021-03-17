import React from "react";
import { Field } from "formik";
import {
  engtoNepNumber,
  getCommaSeperateNumber,
  getNumberfromCommaSeperated,
} from "utils/utilsFunction/number-converter";
import StyledSelect from "components/React/StyledSelect/StyledSelect";
import EnglishDatePicker from "components/React/EnglishDatepicker/EnglishDatepicker";
import NepaliDatePicker from "components/React/Datepicker/Datepicker";

const errorStyleInput: React.CSSProperties = {
  borderColor: "#B71C1C",
};

interface Props {
  type: string;
  name: string;
  label?: string;
  value?: any;
  placeholder?: string;
  boolean?: boolean;
  disabled?: boolean;
  commaSeparated?: boolean;
  rows?: number;
  icon?: string;
  errors?: any;
  touched?: any;
  notRequired?: boolean;
  radioOptions?: any;
  checkboxOptions?: any;
  selectSettings?: any;
  dateSettings?: any;
  t?: TTranslationFunction;
  style?: any;
  handleBlur?: any;
  formikHandleBlur?: any;
  formikHandleChange?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
  onChangeCallbackAction?: any;
  iconClick?: any;
}

const FormGroup: React.FC<Props> = (props, ref) => {
  const {
    disabled,
    type,
    label,
    name,
    value,
    icon,
    formikHandleBlur,
    formikHandleChange,
    onChangeCallbackAction,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    notRequired,
    radioOptions,
    selectSettings,
    dateSettings,
    t,
    rows,
    placeholder,
    checkboxOptions,
    iconClick,
    commaSeparated,
  } = props;
  const truncatedName = name.includes(".")
    ? name.split(".")[name.split(".").length - 1]
    : name;

  const renderField = () => {
    switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <input
            readOnly={disabled}
            id={name}
            name={name}
            type={commaSeparated ? "text" : type}
            autoComplete="off"
            className="form-control"
            value={commaSeparated ? getCommaSeperateNumber(value) : value}
            onBlur={formikHandleBlur}
            onChange={(e: any) => {
              if (commaSeparated) {
                e.target.value = +getNumberfromCommaSeperated(e.target.value);
              }
              formikHandleChange(e);
              if (onChangeCallbackAction) {
                onChangeCallbackAction(e);
              }
            }}
            style={errors[`${name}`] && touched[`${name}`] && errorStyleInput}
            placeholder={placeholder}
          />
        );

      case "react-select":
        return (
          <StyledSelect
            isDisabled={selectSettings.disabled}
            onBlur={() => {
              setFieldTouched(name, true);
            }}
            options={selectSettings.options}
            value={
              selectSettings.value !== undefined ? selectSettings.value : null
            }
            touched={touched[`${name}`]}
            error={errors[`${name}`]}
            name={name}
            id={name}
            isSearchable={true}
            onChange={(name: string, value: any, other: any) => {
              formikHandleChange({ target: { name, value } });
              if (onChangeCallbackAction)
                onChangeCallbackAction({
                  target: { name, value },
                  action: other,
                });
            }}
            placeholder={placeholder}
            {...selectSettings}
          />
        );

      case "DatePicker":
        return (
          <div className="react-datepicker-container">
            <EnglishDatePicker
              autoComplete="off"
              selected={dateSettings.value}
              dateFormat={
                dateSettings.dateFormat ? dateSettings.dateFormat : "yyyy-MM-dd"
              }
              className={
                errors[`${name}`] && touched[`${name}`]
                  ? ["form-control form-control--error"].join(" ")
                  : "form-control"
              }
              name={name}
              onChange={(date: any) => {
                setFieldValue(name, date);
              }}
              showYearDropdown={true}
              showMonthDropdown={true}
              {...dateSettings}
            />
          </div>
        );

      case "NepaliDatePicker":
        return (
          <NepaliDatePicker
            className="form-control"
            id={name}
            // style={errors[`${name}`] && touched[`${name}`] && errorStyleInput}
            value={value ? engtoNepNumber(value) : ""}
            onChange={(englishDate: any, nepaliDate: any) => {
              setFieldValue(name, nepaliDate);
            }}
          />
        );

      case "radio":
        return (
          <div className="custom--radio-inline mt-1">
            {radioOptions.map((radio: any) => {
              return (
                <div className="custom--radio" key={radio.value}>
                  <input
                    disabled={disabled}
                    className="form-control"
                    id={`${name}-${radio.value}`}
                    name={name}
                    type="radio"
                    value={radio.value}
                    checked={value === radio.value}
                    onBlur={formikHandleBlur}
                    onChange={(e) => {
                      formikHandleChange({
                        target: {
                          name: e.target.name,
                          value: e.target.value,
                        },
                      });
                      if (onChangeCallbackAction) onChangeCallbackAction(e);
                    }}
                  />
                  {
                    <label
                      className={`${disabled ? "cursor-disabled" : ""}`}
                      htmlFor={`${name}-${radio.value}`}
                    >
                      {radio.label}
                    </label>
                  }
                </div>
              );
            })}
          </div>
        );

      case "checkbox":
        return (
          <div>
            {checkboxOptions.map((checkbox: any) => {
              return (
                <div
                  className="custom-control custom-checkbox"
                  key={checkbox.value}
                >
                  <input
                    type="checkbox"
                    disabled={disabled}
                    id={`${name}-${checkbox.value}`}
                    name={name}
                    value={checkbox.value}
                    checked={value.includes(checkbox.value)}
                    className="custom-control-input"
                    onChange={(e) => {
                      formikHandleChange(e);
                      if (onChangeCallbackAction) onChangeCallbackAction(e);
                    }}
                  />
                  <label
                    className="custom-control-label cursor-pointer"
                    htmlFor={`${name}-${checkbox.value}`}
                  >
                    {checkbox.label}
                  </label>
                </div>
              );
            })}
          </div>
        );

      case "textarea":
        return (
          <Field
            component="textarea"
            rows={rows || 7}
            className="form-control"
            id={name}
            name={name}
            value={value}
            disabled={disabled}
            style={errors[`${name}`] && touched[`${name}`] && errorStyleInput}
            placeholder={placeholder}
            onChange={(e: any) => {
              formikHandleChange(e);
              if (onChangeCallbackAction) {
                onChangeCallbackAction(e);
              }
            }}
          />
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type="text"
            autoComplete="off"
            className="form-control"
            value={value}
            onBlur={formikHandleBlur}
            onChange={(e) => {
              formikHandleChange(e);
              if (onChangeCallbackAction) onChangeCallbackAction(e);
            }}
            style={
              errors[`${truncatedName}`] &&
              touched[`${truncatedName}`] &&
              errorStyleInput
            }
          />
        );
    }
  };

  return (
    <div className={icon ? "form-group icon" : "form-group"}>
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {!notRequired ? <small className="text-danger">*</small> : null}
        </label>
      )}
      {renderField()}
      {icon ? (
        <i onClick={iconClick ? iconClick : ""} className={icon}></i>
      ) : null}
      {errors[truncatedName] && touched[truncatedName] && (
        <div className="error">
          <i className="ic-error"></i>{" "}
          {t ? t(errors[truncatedName]) : errors[truncatedName]}
        </div>
      )}
    </div>
  );
};

export default FormGroup;
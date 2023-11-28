import { useState } from "react";
import { useTranslation } from "react-i18next";

const fixedInputClass =
  "rounded-md bg-white shadow-lg appearance-none block w-full px-3.5 py-2.5 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm p-2.5 ltr:pr-10 rtl:pl-10 ";

export default function InputWithImage({
  handleChange,
  blurChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  imgPath,
  tooltipMsg = "vid_tooltip",
  disabled = false,
  formError = "",
  passwordShowIcon = "images/password_show.svg",
  passwordHideIcon = "images/password_hide.svg",
  i18nKeyPrefix = "tooltips",
}) {
  const { t } = useTranslation("translation", { keyPrefix: i18nKeyPrefix });

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordState = () => {
    setShowPassword(!showPassword);
    let passwordRef = document.getElementById(id);
    passwordRef.setAttribute("type", showPassword ? "text" : "password");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <label
          htmlFor={labelFor}
          className="block mb-2 text-xs font-medium text-gray-900 text-opacity-70"
        >
          {labelText}
        </label>
        {formError && (
          <label
            htmlFor={labelFor}
            className="font-medium text-xs text-red-600"
          >
            {formError}
          </label>
        )}
      </div>
      <div className="relative">
        {imgPath &&
          <div className="flex absolute inset-y-0 items-center p-3 pointer-events-none ltr:right-0 rtl:left-0">
            <img className="w-6 h-6" src={imgPath} />
          </div>
        }
        <input
          disabled={disabled}
          onChange={handleChange}
          onBlur={blurChange}
          value={value}
          type={type}
          id={id}
          name={name}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
          title={t(tooltipMsg)}
        />
        {type === "password" && (
          <span
            className="flex absolute inset-y-0 p-3 pt-2 ltr:right-0 rtl:left-0 cursor-pointer"
            onClick={changePasswordState}
          >
            {showPassword ? (
              <img className="w-6 h-6" src={passwordShowIcon} />
            ) : (
              <img className="w-6 h-6" src={passwordHideIcon} />
            )}
          </span>
        )}
      </div>
    </>
  );
}

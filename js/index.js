(() => {
    console.log("inside index.js");

    // Globals

    const dayInput = document.querySelector('#day-input');
    const monthInput = document.querySelector('#month-input');
    const yearInput = document.querySelector('#year-input');
    const daySpan = document.querySelector('#day-value');
    const monthSpan = document.querySelector('#month-value');
    const yearSpan = document.querySelector('#year-value');
    const dayLabel = document.querySelector('#day-label');
    const monthLabel = document.querySelector('#month-label');
    const yearLabel = document.querySelector('#year-label');
    const dayError = document.querySelector('#invalid-day');
    const monthError = document.querySelector('#invalid-month');
    const yearError = document.querySelector('#invalid-year');
    const submitBtn = document.querySelector('.arrow-wrapper');

    // Functions

    const dateDiff = (date1, date2) => {
        const diff = {
            years: 0,
            months: 0,
            days: 0
        };
        const daysInMonth = [
            31,
            (date1.getFullYear() % 4 === 0 && date1.getFullYear() % 100 !== 0) || date1.getFullYear() % 400 === 0 ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        diff.years = date2.getFullYear() - date1.getFullYear();
        diff.months = date2.getMonth() - date1.getMonth();
        if(diff.months < 0) {
            diff.years--;
            diff.months += 12;
        }
        diff.days = date2.getDate() - date1.getDate();
        if(diff.days < 0) {
            if(diff.months > 0) {
                diff.months--;
            } else {
                diff.years--;
                diff.months = 11;
            }
            diff.days += daysInMonth[date1.getMonth()];
        }
        return diff;
    }
    const clearInputs = () => {
        dayInput.value = "";
        monthInput.value = "";
        yearInput.value = "";
    }
    const setDateValues = amountOfTime => {
        daySpan.innerText = amountOfTime.days;
        monthSpan.innerText = amountOfTime.months;
        yearSpan.innerText = amountOfTime.years;
    };
    const hasBlank = (year, month, day) => {
        return year === '' || month === '' || day === '';
    };
    const hasSpecificError = (currentYear, year, month, day) => {
        const daysInMonth = [
            31,
            (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        return currentYear < year
            || month < 0
            || month > 12
            || day < 1
            || day > 31
            || day > daysInMonth[month - 1];
    };
    const isValidDate = (currentDate, year, month, day) => {
        const currentYear = currentDate.getFullYear();
        let isValid = true;
        if(
            hasBlank(year, month, day)
            || hasSpecificError(currentYear, year, month, day)
            || currentDate.getTime() < (new Date(year, month - 1, day)).getTime()
        ) {
            isValid = false;
        }
        return isValid;
    };
    const renderNoYearErrors = () => {
        yearLabel.style.color = 'var(--smokey-grey)';
        yearInput.style.border = '1px solid var(--light-grey)';
        yearError.innerText = '';
        yearError.style.display = 'none';
    };
    const renderNoMonthErrors = () => {
        monthLabel.style.color = 'var(--smokey-grey)';
        monthInput.style.border = '1px solid var(--light-grey)';
        monthError.innerText = '';
        monthError.style.display = 'none';
    };
    const renderNoDayErrors = () => {
        dayLabel.style.color = 'var(--smokey-grey)';
        dayInput.style.border = '1px solid var(--light-grey)';
        dayError.innerText = '';
        dayError.style.display = 'none';
    };
    const renderNoErrors = () => {
        renderNoYearErrors();
        renderNoMonthErrors();
        renderNoDayErrors();
    };
    const renderYearError = message => {
        yearLabel.style.color = 'var(--light-red)';
        yearInput.style.border = '1px solid var(--light-red)';
        yearError.innerText = message;
        yearError.style.display = 'block';
    };
    const renderMonthError = message => {
        monthLabel.style.color = 'var(--light-red)';
        monthInput.style.border = '1px solid var(--light-red)';
        monthError.innerText = message;
        monthError.style.display = 'block';
    };
    const renderDayError = message => {
        dayLabel.style.color = 'var(--light-red)';
        dayInput.style.border = '1px solid var(--light-red)';
        dayError.innerText = message;
        dayError.style.display = 'block';
    };
    const renderInvalidDate = message => {
        renderYearError('');
        renderMonthError('');
        renderDayError(message);
    }
    const renderInvalidDateMessages = (currentDate, year, month, day) => {
        const currentYear = currentDate.getFullYear();
        const daysInMonth = [
            31,
            (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        if(hasBlank(year, month, day)) {
            if(year === '') {
                renderYearError('This field is required');
            } else {
                renderNoYearErrors();
            }
            if(month === '') {
                renderMonthError('This field is required');
            } else {
                renderNoMonthErrors();
            }
            if(day === '') {
                renderDayError('This field is required');
            } else {
                renderNoDayErrors();
            }
        }
        else if(hasSpecificError(currentYear, year, month, day)) {
            if(currentYear < year) {
                renderYearError('Must be in the past');
            } else {
                renderNoYearErrors();
            }
            if(month < 0 || month > 12) {
                renderMonthError('Must be a valid month');
            } else {
                renderNoMonthErrors();
            }
            if(day < 1 || day > 31 || day > daysInMonth[month - 1]) {
                renderDayError('Must be a valid day');
            } else {
                renderNoDayErrors();
            }
        }
        else if (currentDate.getTime() < (new Date(year, month - 1, day)).getTime()) {
            renderInvalidDate('Must be in the past');
        }
        else {
            renderInvalidDate('Must be a valid date');
        }
    };
    const handleSubmitClick = () => {
        const currentDate = new Date();
        if(isValidDate(currentDate, yearInput.value, monthInput.value, dayInput.value)) {
            const userDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
            const amountOfTime = dateDiff(userDate, currentDate);
            setDateValues(amountOfTime);
            renderNoErrors();
            clearInputs();
        } else {
            renderInvalidDateMessages(currentDate, yearInput.value, monthInput.value, dayInput.value);
        }
    };

    // Events

    submitBtn.addEventListener('click', handleSubmitClick);

    // On Load


})();
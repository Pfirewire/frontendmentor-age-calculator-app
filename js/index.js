(() => {
    console.log("inside index.js");

    // Globals

    const dayInput = document.querySelector('#day-input');
    const monthInput = document.querySelector('#month-input');
    const yearInput = document.querySelector('#year-input');
    const daySpan = document.querySelector('#day-value');
    const monthSpan = document.querySelector('#month-value');
    const yearSpan = document.querySelector('#year-value');
    const submitBtn = document.querySelector('.arrow-wrapper');

    // Functions

    const dateDiffInDays = (date1, date2) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };

    const convertDaysToYearMonthDay = days => {
        const amountOfTime = {
            years: 0,
            months: 0,
            days: 0
        };
        if(days > 365) {
            amountOfTime.years = Math.floor(days / 365);
            days = days - (amountOfTime.years * 365);
        }
        if(days > 31) {
            amountOfTime.months = Math.floor(days / 31);
            days = days - (amountOfTime.months * 31);
        }
        amountOfTime.days = days;
        return amountOfTime;
    };

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

    const handleSubmitClick = () => {
        console.log("Submit button clicked");
        const userDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        const dateDiff = dateDiffInDays(userDate, new Date());
        console.log(dateDiff);
        const amountOfTime = convertDaysToYearMonthDay(dateDiff);
        console.log(amountOfTime);
        clearInputs();
        setDateValues(amountOfTime);
    };

    // Events

    submitBtn.addEventListener('click', handleSubmitClick);

    // On Load


})();
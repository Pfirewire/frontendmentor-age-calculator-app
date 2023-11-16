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

    const handleSubmitClick = () => {
        console.log("Submit button clicked");
        const userDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        const amountOfTime = dateDiff(userDate, new Date());
        console.log(amountOfTime);
        setDateValues(amountOfTime);
        clearInputs();
    };

    // Events

    submitBtn.addEventListener('click', handleSubmitClick);

    // On Load


})();
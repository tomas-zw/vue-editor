const validateForm = {
    validateEmail: function validateEmail(email) {
        const pattern = /\S+\@\S+\.[a-z]{2,}/;
        if (pattern.test(email)) {
            return true;
        };
        return false;
    },
    validatePassword: function validatePassword(password) {
        //no whitespace and 4+ chars
        const pattern = /\S{4,}/;
        if (pattern.test(password)) {
            return true;
        };
        return false;
    },
    isFormOk: function (email, password) {
        return (email === password && email === 'OK');

    }
};

export default validateForm;



module.exports = {
 afterExecution : function(errorMessage, successMessage, res) {
    return function(err) {
        if (err) {
            return res(errorMessage+' '+err.message);
        } else {
            res(successMessage);
        }
    }
}
}

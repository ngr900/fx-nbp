class FXNBPError extends Error {
	name = 'FXNBPError';
	constructor(message) {
		super(message);
	}
}

class FXNBPDateError extends FXNBPError {
	name = 'FXNBPDateError';
	constructor(message) {
		super(message);
	}
}

function throwUnexpectedError(error) {
	console.warn('This error should not happen. Please file an issue.');
	throw error;
}

module.exports = { FXNBPError, FXNBPDateError, throwUnexpectedError };

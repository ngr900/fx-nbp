const repoLink = 'https://github.com/ngr900/fx-nbp/issues';

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
	console.warn(`This error should not happen. Please open an issue at ${repoLink}`);
	throw error;
}

module.exports = { FXNBPError, FXNBPDateError, throwUnexpectedError };

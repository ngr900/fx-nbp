const repoLink = 'https://github.com/ngr900/fx-nbp/issues';

class FXNBPError extends Error {
	constructor(message) {
		super(message);
		this.name = 'FXNBPError';
	}
}

class FXNBPDateError extends FXNBPError {
	constructor(message) {
		super(message);
		this.name = 'FXNBPDateError';
	}
}

function throwUnexpectedError(error) {
	console.warn(`This error should not happen. Please open an issue at ${repoLink}`);
	throw error;
}

module.exports = { FXNBPError, FXNBPDateError, throwUnexpectedError };

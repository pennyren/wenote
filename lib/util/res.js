function resetResponse(success, result) {
	var result = result || [];
	return {
		success: success,
		result: result
	}
}
module.exports = resetResponse;
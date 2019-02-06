
function message(_data,_method = '') {

	_message = {}

	if(_method != "" || _method != '') {
		_message.method = _method
	}
	if(_data != "" || _data != '') {
		_message.data = _data
	}
	return _message

}



module.exports = {
	message
}

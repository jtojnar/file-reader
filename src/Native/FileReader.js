
var _jtojnar$file_reader$Native_FileReader = function() {

    function useReader(method, fileObjectToRead) {
        return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

            /*
             * Test for existence of FileRader using
             * if(window.FileReader) { ...
             * http://caniuse.com/#search=filereader
             * main gap is IE10 and 11 which do not support readAsBinaryFile
             * but we do not use this API either as it is deprecated
             */
            var reader = new FileReader();

            reader.onload = function(evt) {
                return callback(
                    _elm_lang$core$Native_Scheduler.succeed(
                        _elm_lang$core$Native_Utils.Tuple2( fileObjectToRead.lastModifiedDate.toLocaleString(),
                                                            evt.target.result
                                                          )
                    )
                );
            };

            reader.onerror = function() {
                return callback(_elm_lang$core$Native_Scheduler.fail({ctor : 'ReadFail'}));
            };

            // Error if not passed an objectToRead or if it is not a Blob
            if (!fileObjectToRead || !(fileObjectToRead instanceof Blob)) {
                return callback(_elm_lang$core$Native_Scheduler.fail({ctor : 'NoValidBlob'}));
            }

            return reader[method](fileObjectToRead);
        });
    }

    // readAsTextFile : Value -> Task error String
    var readAsTextFile = function(fileObjectToRead){
        return useReader("readAsText", fileObjectToRead);
    };

    // readAsArrayBuffer : Value -> Task error String
    var readAsArrayBuffer = function(fileObjectToRead){
        return useReader("readAsArrayBuffer", fileObjectToRead);
    };

    // readAsDataUrl : Value -> Task error String
    var readAsDataUrl = function(fileObjectToRead){
        return useReader("readAsDataURL", fileObjectToRead);
    };

    return {
        readAsTextFile : readAsTextFile,
        readAsArrayBuffer : readAsArrayBuffer,
        readAsDataUrl: readAsDataUrl
    };
}();

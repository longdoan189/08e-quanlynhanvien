function Validation() {
    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value,selectorError,name) {
        //Xử lý không hợp lệ
        if(value === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraKyTu = function(value,selectorError,name) {
        var regexAllLetter = /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;
        
        if(regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải là ký tự tiếng Việt';
        return false;
    }
    this.tatCaSo = function(value, selectorError,name) {
        var regexAllNumber = /^[0-9]+$/;
        if (regexAllNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải là số';
        return false;
    }
    this.kiemTraSoKyTu = function(value,selectorError,minLength,maxLength,name) {
        console.log(minLength, maxLength, value.length);
        if(value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).innerHTML = `${name} phải có từ ${minLength} ký tự đến ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGiatri = function(value,selectorError,minValue,maxValue,name) {
        if(value < minValue || value > maxValue) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}
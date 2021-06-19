function NhanVien(){
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.heSoChucVu = '';
    this.chucVu = function() {
        if (Number(this.heSoChucVu) === 1) {
            return "Nhân viên";
        }
        if (Number(this.heSoChucVu) === 2) {
            return "Quản lý";
        }
        if (Number(this.heSoChucVu) === 3) {
            return "Giám đốc";
        }
        return "Không rõ";
    }
    this.tinhLuong = function () {
        return Number(this.luongCoBan)*Number(this.soGioLamTrongThang);
    }
    this.xepLoaiNhanVien = function () {
        if (Number(this.soGioLamTrongThang) > 120) {
            return "Xuất sắc";
        }
        if (Number(this.soGioLamTrongThang) > 100) {
            return "Giỏi";
        }
        if (Number(this.soGioLamTrongThang) > 80) {
            return "Khá";
        }
        if (Number(this.soGioLamTrongThang) > 50) {
            return "Trung bình";
        }
        return "Không thể xếp loại";
    }    
}
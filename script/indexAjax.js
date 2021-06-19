/**Lấy thông tin 1 đống nhân viên (get) */
function layDanhSachNhanVienApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json',
    })
    promise.then(function(result) {
        console.log('result', result.data);
        renderTableNhanVien(result.data);
    })
    promise.catch(function(error) {
        console.log('error',error);
    })
}

//gọi hàm api
layDanhSachNhanVienApi();

function renderTableNhanVien(arrNV) { //input
    //Từ mảng arrNV tạo ra 1 chuỗi html <tr> <td></td></tr>
    //arrNV = [{maNhanVien:'',....},{maNhanVien:'',....},..]
    var content = '';
    for (var index = 0; index < arrNV.length; index++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var nv = arrNV[index];
        var nhanVien = new NhanVien();
        nhanVien.maNhanVien = nv.maNhanVien;
        nhanVien.tenNhanVien = nv.tenNhanVien;
        nhanVien.heSoChucVu = nv.heSoChucVu;
        nhanVien.luongCoBan = nv.luongCoBan;
        nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;

        //Từ dữ liệu sinh viên đó => tạo ra 1 chuỗi html tr
        var trNhanVien = `
                <tr>
                    <td>${nhanVien.maNhanVien}</td>
                    <td>${nhanVien.tenNhanVien}</td>
                    <td>${nhanVien.chucVu()}</td>
                    <td>${nhanVien.luongCoBan}</td>
                    <td>${nhanVien.tinhLuong()}</td>
                    <td>${nhanVien.soGioLamTrongThang}</td>
                    <td>${nhanVien.xepLoaiNhanVien()}</td>
                    <td><button onclick="xoaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-danger">Xoá</button>
                    <button onclick="chinhSua('${nhanVien.maNhanVien}')" class="btn btn-primary">Chỉnh sửa</button>
                    
                    </td>
                </tr>
        `;
        content += trNhanVien;
    };
    //Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector('#tblNhanVien').innerHTML = content;
    console.log('content',content);
}

/**Thêm thông tin 1 nhân viên(post) */
document.querySelector('#btnThemNhanVien').onclick = function() {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#heSoChucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    console.log('sv',nhanVien);

    // Kiểm tra dữ liệu trước khi đưa vào mảng
    // ------------------------------------- validation ---------------------------------------------------
    //(1): Kiểm tra rỗng (bắt buộc nhập)
    var kiemTra = new Validation();
    var valid = true;
    valid &= (kiemTra.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien','Mã nhân viên') &
              kiemTra.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien','Tên nhân viên') &
              kiemTra.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoBan','Lương cơ bản') &
              kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGioLamTrongThang','Số giờ làm trong tháng '));

    //(2): Kiểm tra định dạng dữ liệu
    //(2.1): Kiểm tra ký tự
    valid &= (kiemTra.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien','Tên nhân viên') &
              kiemTra.kiemTraSoKyTu(nhanVien.maNhanVien,"#error_length_maNhanVien",4,7,"Mã nhân viên"));
    //(2.2): Kiểm tra số
    valid &= (kiemTra.tatCaSo(nhanVien.soGioLamTrongThang,"#error_allNumber_soGioLamTrongThang", 'Số giờ làm trong tháng') &
              kiemTra.tatCaSo(nhanVien.luongCoBan,"#error_allNumber_luongCoBan", 'Lương cơ bản') & 
              kiemTra.tatCaSo(nhanVien.maNhanVien,"#error_allNumber_maNhanVien", 'Mã nhân viên'));
    //(2.3): Kiểm tra lương và số giờ làm hợp lệ
    valid &= (kiemTra.kiemTraGiatri(nhanVien.luongCoBan,'#error_outRange_luongCoBan',1000000,20000000,"Lương cơ bản") &
              kiemTra.kiemTraGiatri(nhanVien.soGioLamTrongThang,'#error_outRange_soGioLamTrongThang',50,150,"Số giờ làm"));
    if (valid) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method:'post',
            data: nhanVien,
        })
        promise.then(function(result) {
            console.log('result',result);
            layDanhSachNhanVienApi();
            alert("Thêm nhân viên thành công");
        })
        promise.catch(function(error) {
            console.log('error',error.response.data);
            capNhatThongTin(nhanVien);
        })
    }
    else {
        alert("Thêm/thay đổi chưa thành công. Vui lòng điền đúng định dạng")
    }
}

/**Xóa thông tin 1 nhân viên (delete) */
function xoaNhanVien(maNhanVien) {
    console.log('mnv', maNhanVien);
    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE',
    })
    promise.then(function(result) {
        console.log('result',result.data);
        layDanhSachNhanVienApi();
        alert("Xóa nhân viên thành công");
    })
    promise.catch(function(error) {
        console.log('error',error.response.data);
    })
}

/**Lấy thông tin 1 nhân viên cố định (get) */
function chinhSua(maNhanVien) {
    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET',
    })
    promise.then(function(result) {
        var nhanVien = result.data;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#heSoChucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
    })
    promise.catch(function(error) {
        console.log('error',error.response.data);
    })
}

/**Cập nhật thông tin 1 nhân viên cố định (put) */
function capNhatThongTin(nhanVien) {
    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien,
    })
    promise.then(function(result) {
        console.log('result',result.data);
        layDanhSachNhanVienApi();
        alert("Cập nhật thông tin nhân viên thành công");
    })
    promise.catch(function(error) {
        console.log('error',error.response.data);
    })
}
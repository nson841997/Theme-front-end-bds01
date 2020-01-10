$(document).ready(function () {
    jQuery.validator.messages.required = "Trường này là bắt buộc, vui lòng nhập dữ liệu!";
    jQuery.validator.messages.number = "Trường nhập không phải là số, vui lòng nhập lại!";
    jQuery.validator.messages.email = "Trường nhập không phải là email, vui lòng nhập lại!";
    jQuery.validator.messages.remote = "Email hoặc Số điện thoại đã tồn tại, vui lòng nhập lại!";
    $("#adminForm").validate();
    $('.date').datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: true
    });
    $("#ddlCity").change(function () {
        var id = $('#ddlCity').val() == "" ? 0 : $('#ddlCity').val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetDistricts/' + id, function (data) {
                $("#ddlDistrict").empty().append('<option value="">- Quận/ Huyện -</option>').append(data).trigger('change');
            });
            $.get('/AjaxData/GetWards/?id=0', function (data) {
                $('#ddlWard').empty().append('<option value="">- Phường/Xã -</option>').trigger('change');
            });
            $.get('/AjaxData/GetDomainStreets/?wardid=0&cityid=' + $("#ddlCity").val(), function (data) {
                $('#ddlStreet').empty().append('<option value="">- Đường phố -</option>').append(data);
            });
            $('#ddlProject').empty().append('<option value="">- Dự án -</option>');
        } else {
            $("#ddlDistrict").empty().append('<option value="">- Quận/ Huyện -</option>').trigger('change');
            $('#ddlWard').empty().append('<option value="">- Phường/Xã -</option>').trigger('change');
            $('#ddlStreet').empty().append('<option value="">- Đường phố -</option>');
            $('#ddlProject').empty().append('<option value="">- Dự án -</option>');
        }
    });
    $('#ddlDistrict').change(function () {
        var id = $('#ddlDistrict').val() == "" ? 0 : $('#ddlDistrict').val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetDomainProject/' + id, function (data) {
                $('#ddlProject').empty().append('<option value="">- Dự án -</option>').append(data);
            });
            $.get('/AjaxData/GetWards/' + id, function (data) {
                $('#ddlWard').empty().append('<option value="">- Phường/Xã -</option>').append(data).trigger('change');
            });
            $.get('/AjaxData/GetDomainStreets/?wardid=0&districtid=' + id, function (data) {
                $('#ddlStreet').empty().append('<option value="">-- Đường phố --</option>').append(data);
            });
        } else {
            $('#ddlWard').empty().append('<option value="">- Phường/Xã -</option>').trigger('change');
            $('#ddlStreet').empty().append('<option value="">- Đường phố -</option>');
            $('#ddlProject').empty().append('<option value="">- Dự án -</option>');
        }
    });
    $('#ddlWard').change(function () {
        var id = $('#ddlWard').val() == "" ? 0 : $('#ddlWard').val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetDomainStreets/?wardid=' + id, function (data) {
                $('#ddlStreet').empty().append('<option value="">-- Đường phố --</option>').append(data);
            });
        } else {
            $('#ddlStreet').empty().append('<option value="">- Đường phố -</option>');
        }
    });
    $("#ddlCategory").change(function () {
        var id = $('#ddlCategory').val() == "" ? 0 : $('#ddlCategory').val();
        $.get('/AjaxData/GetPrices/' + id, function (data) {
            $('#ddlPrice').html(data);
        });
    });
    $("#ddlCustTarget").change(function () {
        var id = $('#ddlCustTarget').val() == "" ? 0 : $('#ddlCustTarget').val();
        $.get('/AjaxData/GetPrices/' + id, function (data) {
            $('#ddlCustPrice').html(data);
        });
    });
    $("#UploadImg").change(function () {
        var data = new FormData();
        var files = $("#UploadImg").get(0).files;
        if (files.length > 0) {
            for (i = 0; i < files.length; i++)
                data.append("MyImages" + i, files[i]);
        }
        $.ajax({
            url: "/AjaxData/UploadFile",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                $("#showimg").html(response);
            },
            error: function (er) {
                alert(er);
            }
        });
    });
    $(".rnlist a").click(function () {
        $(".rnlist a").removeClass("rnact");
        $(this).addClass("rnact");
    });
    jQuery(window).scroll(function () {
        var topHeight = jQuery(window).scrollTop();
        if (topHeight > 100) {
            jQuery('.go_top').show();
        }
        else {
            jQuery('.go_top').hide();
        }
    });
});
function RNGetCats(typeid, catid) {
    $("#" + typeid).change(function () {
        var id = $('#' + typeid).val() == "" ? 0 : $('#' + typeid).val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetCategory/' + id, function (data) {
                $('#'+catid).html(data);
            });
        } else {
            $("#" + catid).empty().append('<option value="">- Loại nhà đất -</option>').trigger('change');
        }
    });
}
function RNGetDisticts(cityid, distictid) {
    $("#" + cityid).change(function () {
        var id = $('#' + cityid).val() == "" ? 0 : $('#' + cityid).val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetDistricts/' + id, function (data) {
                $("#" + distictid).empty().append('<option value="">- Quận/ Huyện -</option>').append(data).trigger('change');
            });
        } else {
            $("#" + distictid).empty().append('<option value="">- Quận/ Huyện -</option>').trigger('change');
        }
    });
}
function RNGetWards(distictid, wardid) {
    $("#" + distictid).change(function () {
        var id = $('#' + distictid).val() == "" ? 0 : $('#' + distictid).val();
        if (parseInt(id) > 0) {
            $.get('/AjaxData/GetWards/' + id, function (data) {
                $('#' + wardid).empty().append('<option value="">- Chọn -</option>').append(data);
            });
        } else {
            $("#" + wardid).empty().append('<option value="">- Chọn -</option>');
        }
    });
}
function ShowTab(typeid, tagid) {
    if (parseInt(typeid) > 0) {
        var catid = typeid == 1 ? 101 : 201;
        $.get('/AjaxData/GetCategory/' + typeid, function (data) {
            $('#ddlCategory').html(data);
        });
        $.get('/AjaxData/GetPrices/' + catid, function (data) {
            $('#ddlPrice').html(data);
        });
        $("a").removeClass("active")
        $("#" + tagid).addClass("active");
    }
}
function ValidateSearch() {
    return true;
}
function RNCheckSearch() {
    var key= $('#ddlHBy').val();
    if (key == "") {
        alert("Bạn chưa nhập từ khóa để tìm kiếm");
        return false;
    }
    return true;
}

function SaveReqBroker(name, mail, phone, location, desc) {
    $.get('/AjaxData/AddReqBroker?name=' + name + '&mail=' + mail + '&phone=' + phone + '&location=' + location + '&desc=' + desc, function (data) {
        if (data == "1") {
            alert("Gửi thông tin yêu cầu thuê/mua thành công. Chúng tôi sẽ liên lạc sớm nhất đến bạn.");
            document.location = link;
        } else {
            alert("Gửi thông tin yêu cầu thuê/mua thất bại");
        }
    });
}
/*kindid=1,2,3: Supervip, Vip, Normal, 4: nhieu nguoi xem
filterid:1: co anh,2: ko anh, 3: Co video, 4: Co ban do
*/
function RNShowData(kindid, tagid, filterid, memberid, number, viewname) {
    if (parseInt(kindid) > 0) {
        $.get('/Property/AjaxFilter?memberid=' + memberid + '&viewname=' + viewname + '&filterid=' + filterid + '&number=' + number + '&kindid=' + kindid, function (data) {
            $('#' + tagid).html(data);
            return false;
        });
    }
    return false;
}
function RNShowSuperVipData(tagid, filterid) {
    return RNShowData(1, tagid, filterid, 5, 5, '_HItems');
}
function RNShowVipData(tagid, filterid) {
    return RNShowData(2, tagid, filterid, 5, 20, '_Vips');
}
function RNShowNormalData(tagid, filterid) {
    return RNShowData(3, tagid, filterid, 5, 5, '_HItems');
}
function SetPage(page) {
    if (parseInt(page) > 0) {
        $('#ToPage').val(page);
        $("#adminForm").submit();
    }
}
function SetPagesize(txtSize, hdsize) {
    var number = $("#" + txtSize).val();
    if (parseInt(number) > 0) {
        $('#' + hdsize).val(number);
        $("#adminForm").submit();
    }
}
function RNConfirmVip() {
    return confirm("Bạn có chắc chắn muốn nâng cấp cho tin rao này?");
}
function GetDateDifference(d1, d2) {
    // check if both is not empty
    if ($('#' + d1).val() == '' || $('#' + d2).val() == '') return 0;
    var diff = RNDaydiff(RNParseDate($('#' + d1).val()), RNParseDate($('#' + d2).val()));
    return diff > 0 ? diff - 1 : 0;
}
function RNParseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}
function RNDaydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
function PreCalculateAmount(d1, d2, kind, show) {
    var diff = GetDateDifference(d1, d2);
    if (diff > 0) {
        var price = 0;
        var val = $("#" + kind).val();
        if (parseInt(val) > 1) {
            if (diff >= 30) {
                $.get('/AjaxData/GetVipPrice/' + val, function (data) {
                    price = parseInt(data);
                    var total = diff * price;
                    var textprice = price > 0 ? "Thành tiền: " + RNFormatNumber(total) + " VNĐ" : "Miễn phí";
                    $("#" + show).html(textprice);
                });
            } else {
                $.get('/AjaxData/GetVipPriceNoPromotion/' + val, function (data) {
                    price = parseInt(data);
                    if (diff < 5) diff = 5;
                    var total = diff * price;
                    var textprice = price > 0 ? "Thành tiền: " + RNFormatNumber(total) + " VNĐ" : "Miễn phí";
                    $("#" + show).html(textprice);
                });
            }
        } else {
            $("#" + show).html("Tin thường miễn phí");
        }
    }
}
function RNResetFilter() {
    $('#adminForm input[type=text], #adminForm select').each(function () {
        $(this).val("");
    })
    if ($("#ToPage").length) $("#ToPage").val("");
    if ($("#hdAction").length) $("#hdAction").val("");
    document.adminForm.submit();
}
function RNShowMoreInfo(id) {
    var tag = "minfo_" + id;
    $("#" + tag).toggle();
}
function RNFormatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
function RNProductUpYN(id) {
    if (confirm("Bạn có muốn UP lên đầu tin đăng có mã tin: " + id + "?")) {
        $.get('/AjaxData/ProductUpYN/' + id, function (data) {
            if (data == "1") {
                alert("Up tin lên đầu thành công.");
            } else {
                alert("Up tin lên đầu thất bại.");
            }
        });
    }
}
function RNCustomerUpYN(id) {
    if (confirm("Bạn có muốn UP lên đầu tin đăng cần thuê - cần mua có mã tin: " + id + "?")) {
        $.get('/AjaxData/CustomerUpYN/' + id, function (data) {
            if (data == "1") {
                alert("Up tin lên đầu thành công.");
            } else {
                alert("Up tin lên đầu thất bại.");
            }
        });
    }
}
function RNShowOwner(id) {
    if (parseInt(id) > 0) {
        var tag = "oinfo_" + id;
        var ishave = $('#' + tag).html();
        if (ishave == "") {
            $.get('/AjaxData/ShowOwnerYN/' + id, function (data) {
                $('#' + tag).html(data);
                $('#' + tag).show();
                return false;
            });
        } else {
            $('#' + tag).toggle();
        }
    }
    return false;
}
function RNSendContact() {
    var Name = $("#Contact_Name").val();
    var Email = $("#Contact_Email").val();
    var Tel = $("#Contact_Tel").val();
    var Desc = $("#Contact_Desc").val();
    if (Tel == "" || Name == "" || Desc=="") {
        alert("Bạn phải nhập họ tên, số điện thoại. Vui lòng điền đầy đủ thông tin.");
        return false;
    }
    var url = "/AjaxData/SaveContact";
    $("#rncontent").hide();
    $("#rnloading").show();
    $.post(url, {
        Name: Name,
        Email: Email,
        Tel: Tel,
        Desc: Desc
    }, function (data) {
        if (data == true) {
            alert("Gửi thông tin thành công. Chúng tôi sẽ liên lạc với bạn sớm nhất có thể!");
            $("#Contact_Name").val("");
            $("#Contact_Email").val("");
            $("#Contact_Tel").val("");
            $("#Contact_Desc").val("");
            location.reload();
        } else {
            alert("Gửi thông tin không thành công. Liên hệ Hotline để biết thêm chi tiết!");
            $("#rncontent").show();
            $("#rnloading").hide();
        }
    });
}
function RNSendBroker() {
    var ContactName = $("#ReqBroker_ContactName").val();
    var ContactEmail = $("#ReqBroker_ContactEmail").val();
    var ContactPhone = $("#ReqBroker_ContactPhone").val();
    var UPrice = $("#ReqBroker_UPrice").val();
    var UCurrencyID = $("#ReqBroker_UCurrencyID").val();
    var UPriceID = $("#ReqBroker_UPriceID").val();
    var Target = $("#ReqBroker_Target").val();
    var Name = $("#ReqBroker_Name").val();
    var Description = $("#ReqBroker_Description").val();
    var ObjectID = $("#ReqBroker_ObjectID").val();
    if (parseFloat(ObjectID) <= 0 || parseFloat(UPrice) <= 0 || parseInt(UCurrencyID) <= 0 || parseInt(UPriceID) <= 0 || Name == "" || Description == "") {
        alert("Bạn phải nhập đầy đủ thông tin giá, tiêu đề, mô tả");
        return false;
    }
    var url = "/AjaxData/SaveReqBroker";
    $("#rncontent").hide();
    $("#rnloading").show();
    $.post(url, {
        ContactName: ContactName,
        ContactEmail: ContactEmail,
        ContactPhone: ContactPhone,
        UPrice: UPrice,
        UCurrencyID: UCurrencyID,
        UPriceID: UPriceID,
        Name: Name,
        Description: Description,
        Target:Target,
        ObjectID: ObjectID
    }, function (data) {
        if (data == true) {
            alert("Gửi thông tin thành công. Chúng tôi sẽ liên lạc với bạn sớm nhất có thể!");
            $("#ReqBroker_ContactName").val("");
            $("#ReqBroker_ContactEmail").val("");
            $("#ReqBroker_ContactPhone").val("");
            $("#ReqBroker_UPrice").val("");
            $("#ReqBroker_UCurrencyID").val("");
            $("#ReqBroker_UPriceID").val("");
            $("#ReqBroker_Target").val("");
            $("#ReqBroker_Name").val("");
            $("#ReqBroker_Description").val("");
            location.reload();
        } else {
            alert("Gửi thông tin không thành công. Liên hệ Hotline để biết thêm chi tiết!");
            $("#rncontent").show();
            $("#rnloading").hide();
        }
    });
}
function RNSendREmail() {
    var email = $("#txtREmail").val();
    var cityid = $("#ddlREmailCity").val();
    var districtid = $("#ddlREmailDistrict").val();
    var catid = $("#ddlREmailCatID").val();
    if (email == "" || parseInt(cityid)<=0) {
        alert("Bạn phải nhập đầy đủ thông tin email, khu vực muốn nhận thông tin");
        return false;
    }
    $.get('/AjaxData/SaveREmail?email=' + email + '&cityid=' + cityid + '&districtid=' + districtid + '&catid=' + catid, function (data) {
        if (data == "1") {
            alert("Gửi thông tin yêu cầu nhận bản tin thành công");
            $("#txtREmail").val("");
            $("#ddlREmailCity").val("");
            $("#ddlREmailDistrict").val("");
            $("#ddlREmailCatID").val("");
            location.reload();
        } else {
            alert("Gửi thông tin yêu cầu nhận bản tin thất bại");
        }
    });
}

//canh
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function ShowMoney(valueid, showid) {
    var r = $("#" + valueid).val();
    if (parseInt(r)>0) {
        $("#" + showid).html("(" + formatNumber(parseFloat(r)) + " VNĐ)");
    } else
        $("#" + showid).html("VNĐ");
}
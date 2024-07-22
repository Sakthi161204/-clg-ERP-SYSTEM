var AddNewCustomer = function() {
    activaTab('divAddNewCustomer');
};

var SaveCustomerInfo = function() {
    if (!FieldValidation('#Name')) {
        FieldValidationAlert('#Name', 'Name is Required.', "warning");
        return;
    }

    var CustomerInfoCRUDViewModel = {
        Name: $("#Name").val(),
        CompanyName: $("#CompanyName").val(),
        Type: $("#Type").val(),
        Phone: $("#Phone").val(),
        Email: $("#Email").val(),
        Address: $("textarea#Address").val(),
        AddressPostcode: $("#AddressPostcode").val(),
        BillingAddress: $("textarea#BillingAddress").val(),
        BillingAddressPostcode: $("#BillingAddressPostcode").val(),
        UseThisAsBillingAddress: $("#UseThisAsBillingAddress").val(),
        Notes: $("#Notes").val(),
    };

    $.ajax({
        type: "POST",
        url: "/CustomerInfo/AddEdit",
        data: CustomerInfoCRUDViewModel,
        success: function(result) {
            $('#CustomerId').append($('<option>', {
                value: result.Id,
                text: result.Name
            }));
            $('#CustomerId').val(result.Id);
            GetCustomerHistory(result.Id);           
            toastr.success(result.AlertMessage, 'Success');
        },
        error: function(errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
    activaTab('divBasicInfo');
};

var AddNewSupplier = function() {
    activaTab('divAddNewCustomer');
};

var SaveSupplier = function() {
    if (!FieldValidation('#Name')) {
        FieldValidationAlert('#Name', 'Name is Required.', "warning");
        return;
    }

    var SupplierCRUDViewModel = {
        Name: $("#Name").val(),
        ContactPerson: $("#ContactPerson").val(),
        Email: $("#Email").val(),
        Phone: $("#Phone").val(),
        Address: $("#Address").val(),
    };

    $.ajax({
        type: "POST",
        url: "/Supplier/AddEdit",
        data: SupplierCRUDViewModel,
        success: function(result) {
            $('#SupplierId').append($('<option>', {
                value: result.Id,
                text: result.Name
            }));
            $('#SupplierId').val(result.Id);           
            toastr.success(result.AlertMessage, 'Success');
        },
        error: function(errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
    activaTab('divBasicInfo');
};


var GetByStudentMeritPosition = function (_ClassId, _SectionId) {
    if (_ClassId == null) {
        SwalSimpleAlert('Please check class first.', "warning");
        setTimeout(function () {
            $('#ClassId').focus();
        }, 500);
        return;
    }

    $.ajax({
        type: "GET",
        url: "/StudentCurrent/GetByStudentMeritPosition?ClassId=" + _ClassId + "&SectionId=" + _SectionId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data == null) {
                return;
            }
            $("#MeritPosition").val(data);
            $("#ToMeritPosition").val(data);
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var LoadStudentByClassId = function () {
    var _ClassId = $("#ClassId").val();

    $.ajax({
        type: "GET",
        url: "/IssueBook/LoadStudentByClassId?ClassId=" + _ClassId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#StudentId').empty();
            for (var i = 0; i < data.length; i++) {
                var _StudentId = document.getElementById("StudentId");
                var _option = document.createElement("option");
                _option.text = data[i].Name;
                _option.value = data[i].Id;
                _StudentId.add(_option);
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}
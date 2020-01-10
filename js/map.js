var geocoder = new google.maps.Geocoder();
var gmap3, gmap3marker;
$(document).ready(function () {
    $("#gmap3-latlng").gmap3({
        marker: {
            //address: "hanoi",
            values: [
                    { latLng: [$('#Product_Lat').val() !='' ? $('#Product_Lat').val() : 21.029528 , $('#Product_Lng').val() !='' ? $('#Product_Lng').val(): 105.777808 ] }
            ],
            options: {
                draggable: true,
                mapTypeControl: false
            },
            events: {
                dragend: function (marker) {
                    gmap3marker = marker;
                    var position = marker.getPosition();
                    $('#Product_Lat').val(position.lat());
                    $('#Product_Lng').val(position.lng());
                    $(this).gmap3({
                        getaddress: {
                            latLng: marker.getPosition(),
                            callback: function (results) {
                                gmap3 = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({ get: "infowindow" }),
                                        content = results && results[1] ? results && results[1].formatted_address : "no address";
                                if (infowindow) {
                                    infowindow.open(gmap3, marker);
                                    infowindow.setContent(content);
                                } else {
                                    $(this).gmap3({
                                        infowindow: {
                                            anchor: marker,
                                            options: { content: content }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        },
        map: {
            options: {
                zoom: 16
            }
        }
    });
    $('#ddlCity, #ddlDistrict, #ddlWard, #ddlStreet').change(function () {
        if (gmap3 == undefined) {
            gmap3 = $('#gmap3-latlng').gmap3('get');
            gmap3marker = $('#gmap3-latlng').gmap3({ get: { name: "marker"} });
        }
        if (gmap3 != undefined) {
            var address = '';
            var street = $('#ddlStreet').children('option:selected');
            if (street.val())
                address = street.text() + ' - ';

            var ward = $('#ddlWard').children('option:selected');
            if (ward.val())
                address = address + ward.text() + ' - ';

            var district = $('#ddlDistrict').children('option:selected');
            if (district.val())
                address = address + district.text() + ' - ';

            var city = $("#ddlCity").children('option:selected');
            if (city.val())
                address = address + city.text();
            $('#Product_Address').val(address);
            if (address == null)
                address = 'hanoi';

            changeLocation(address);
        }
    });

    function changeLocation(address) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                gmap3.setCenter(results[0].geometry.location);
                gmap3marker.setPosition(results[0].geometry.location);

                $('#Product_Lat').val(results[0].geometry.location.lat());
                $('#Product_Lng').val(results[0].geometry.location.lng());
            }
        });
    };
});
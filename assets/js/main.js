$(document).ready(function () {

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
      function isValidEmailChecking(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
    
    
      // MODAL - ВОЙТИ В ЛК
      let modal_opener = document.querySelectorAll('.modal_opener');
      let modal_open = document.querySelector('.login_lk_modal');
      let modal_close = document.querySelector('.login_lk_modal .closeModalBtn');
      let overlay = document.querySelector('.overlay');
      let loginForm = document.getElementById('login_form');
      let okBtn = document.querySelector('.ok_btn_log');
    
      modal_opener.forEach(function(v) {
          v.addEventListener('click', function(e) {
              e.preventDefault();
              modal_open.classList.add('show');
              overlay.classList.add('show');
          })
      });
    
      modal_close.addEventListener('click', function(e) {
          e.preventDefault();
          modal_open.classList.remove('show');
          overlay.classList.remove('show');
      });
    
      okBtn.addEventListener('click', function(e) {
          let emailInput = document.getElementById('modal_input_1');
          let passwordInput = document.getElementById('modal_input_2');
          
          if (emailInput.value === '' || passwordInput.value === '') {
              // e.preventDefault(); 
              alert('Пожалуйста, заполните все поля!');
          }else if(isValidEmail(emailInput.value)){
            loginForm.submit();
          } 
    
      });
    
    
    
       // MODAL - ВОССТАНОВИТЬ ПАРОЛЬ
       let modal_opener_recovery = document.querySelectorAll('.recovery_btn');
       let modal_open_recovery = document.querySelector('.recovery_modal');
       let modal_close_recovery = document.querySelector('.recovery_modal .closeModalBtn');
       let overlay_recovery = document.querySelector('.overlay');
       let lk_modal = document.querySelector('.login_lk_modal');
       let checking_btn = document.querySelector('.checking_btn');
       let recovery_form = document.getElementById('recovery_form');
     
       modal_opener_recovery.forEach(function(v) {
           v.addEventListener('click',function(e){
               e.preventDefault();
               modal_open_recovery.classList.add('show');
               overlay_recovery.classList.add('show');
               lk_modal.classList.remove('show');
           })
       })
       modal_close_recovery.addEventListener('click',function(e){
           e.preventDefault();
           modal_open_recovery.classList.remove('show');
           overlay_recovery.classList.remove('show');
       })
       // MODAL - ПРОВЕРЬТЕ ПОЧТУ
       let modal_opener_checking = document.querySelectorAll('.checking_btn');
       let modal_open_checking = document.querySelector('.checking_modal');
       let modal_close_checking = document.querySelector('.checking_modal .closeModalBtn');
       let overlay_checking = document.querySelector('.overlay');
       modal_close_checking.addEventListener('click',function(e){
        e.preventDefault();
        modal_open_checking.classList.remove('show');
        overlay_checking.classList.remove('show');
      })
       checking_btn.addEventListener('click', function(e) {
          e.preventDefault()
          let emailInputChecking = document.getElementById('email_1');
          
          if (emailInputChecking.value === '') {
              alert('Пожалуйста, заполните все поля!');
          } else{
            modal_open_recovery.classList.remove('show');
            modal_open_checking.classList.add('show');
            overlay_checking.classList.add('show');
          }
      });
    // info
    let info = $('.check_info');
    let info_text = $('.info_text');
    info.hover(
        function () {
            info_text.addClass('active');
        }, 
        function () {
            info_text.removeClass('active');
        }
    ),
    info_text.hover(
        function () {
            info_text.addClass('active');
        }, 
        function () {
            info_text.removeClass('active');
        }
       ),
    //   fixed price
      window.addEventListener('scroll', () => {
        let reveals = document.querySelectorAll('.reveal')
    
        for(let i = 0; i < reveals.length; i++){
            let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = 50;
    
            if(revealTop < windowHeight - revealPoint) {
              reveals[i].classList.add('active')
              $('.buy_insurance').addClass('active');
            }else{
              reveals[i].classList.remove('active')
              $('.buy_insurance').removeClass('active');
            }
        }
      })

    const today = new Date();
    const quantityAlert = W_LANG_EN ? 'Quantity exceeded' : 'Превышено количество';
    const touristLabel = W_LANG_EN ? 'tourist' : 'путешественник';
    const touristAge = W_LANG_EN ? 'years' : 'лет';
    const touristCountLabel = W_LANG_EN ? ' years' : ' год';
    const insuredInfo = W_LANG_EN ? 'Data for ' : 'Данные ';
    const insuredTraveler = W_LANG_EN ? 'traveler' : 'путешественника';
    const insuredQuestion = W_LANG_EN ? 'Why don\'t you need a passport for registration?' : 'Почему для оформления не нужен паспорт?';
    const insuredAnswer = W_LANG_EN ? 'First name, last name and date of birth are sufficient to identify traveler by a insurance company' : 'Для идентификации путешественника страховой компании достаточно Имени, Фамилии и даты рождения';
    const insuredDob = W_LANG_EN ? 'Birth Date' : 'Дата рождения';
    const insuredIsInsurer = W_LANG_EN ? 'The traveler is the buyer' : 'Путешественник является покупателем';
    const calcForm = $('#calculcate_form');
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    let leavingDate = new AirDatepicker('#leaving', {
        minDate: today,
        onSelect({date}) {
            leavingDate.hide();
            let rDate = $('#return').val();
            if (rDate === '') {
                rDate = date;
            } else {
                let dateArray = rDate.split('.');
                rDate = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);
                if (calculateDaysDiff(date, rDate) <= 0) {
                    rDate = date;
                } else {
                    rDate = date;
                }
            }
            returningDate.update({
                minDate: rDate
            });
            returningDate.show();
            $('#return').val(rDate.toLocaleString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }));
            $('.total_days').text(calculateDaysDiff(date, rDate));
            $('input[name="daysInsured"]').val(calculateDaysDiff(date, rDate));
        }
    });
    let returningDate = new AirDatepicker('#return', {
        minDate: today,
        onShow(isFinished) {
            if (!leavingDate.selectedDates.length && isFinished) {
                returningDate.hide();
                leavingDate.show();
            }
        },
        onSelect({date}) {
            returningDate.hide();
            diffDays = calculateDaysDiff(leavingDate.selectedDates[0], returningDate.selectedDates[0]);
            $('.total_days').text(diffDays);
            $('input[name="daysInsured"]').val(diffDays);
        },
    });
    let touristsArray = [];
    var swiper = new Swiper(" .mySwiper1", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        zoom: true,
        freeMode: false,
        pagination: {
            el: ".mySwiper1 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".mySwiper1 .swiper-button-right",
            prevEl: ".mySwiper1 .swiper-button-left",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 15,
            },

            1024: {
                slidesPerView: 5,
                spaceBetween: 10,
            },

            1200: {
                slidesPerView: 6,
                spaceBetween: 20,
            }
        }
    });

    if($('.date_by_hand')){
        $('.date_by_hand').inputmask("99.99.9999");
    }

    if (W_LANG_EN) {
        AirDatepicker.defaults.locale.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        AirDatepicker.defaults.locale.daysMin = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
    }

    function detectMob() {
        return ((window.innerWidth <= 993));
    }

    function calculateDaysDiff(leaving, returning) {
        const dateStart = new Date(leaving);
        const dateEnd = new Date(returning);
        const diffTime = dateEnd - dateStart;
        return (diffTime >= 0) ? (Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1) : 0;
    }

    if ($('.days_select').length > 0) {
        $('.days_select').niceSelect();
    }

    function myFunction() {
        var x = document.getElementById("myDropdown");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    // Если ниже 992px
    if (detectMob()) {
        const products = $('.medical_services');
        products.addClass('swiper');
        let row = products.find('.row');
        row.addClass('swiper-wrapper').removeClass('row');

        $('.medical_services .swiper-wrapper > div')
            .removeClass('col-lg-4 col-md-6 col-sm-12')
            .addClass('swiper-slide');

        const swiper = new Swiper('.medical_services', {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
    }

    $('[name=tourists_count_text]').on('focus', function (e) {
        e.preventDefault();
        $(this).parent().addClass('show_select');
    });

    $(document).on('click', function (evt) {
        if ($(evt.target).parents('.tourists_count').length == 0) {
            $('.tourists_count').removeClass('show_select')
        }
    });

    $(document).on('click', 'input[name="checkYear"]', function (evt) {
        if ($('#leaving').val() == '') {
            $('#leaving').addClass('error');
            return false;
        } else {
            $('#leaving').removeClass('error');
        }
    });

    $(document).on('change', 'input[name="checkYear"]', function (evt) {
        if (evt.target.checked) {
            let daysInYear = $('.days_select').val();
            $('.kalendar_return').addClass('d-none');
            $('.days_in_year').removeClass('d-none');
            $('.days_select').niceSelect('update');
            $('.total_days').text(daysInYear);
            $('input[name="daysInsured"]').val(daysInYear);
        } else {
            $('.kalendar_return').removeClass('d-none');
            $('.days_in_year').addClass('d-none');
            diffDays = calculateDaysDiff(leavingDate.selectedDates[0], returningDate.selectedDates[0]);
            $('.total_days').text(diffDays);
            $('input[name="daysInsured"]').val(diffDays);
        }
    });

    $(document).on('change', 'select[name="daysInYear"]', function (evt) {
        $('.total_days').text($(this).val());
        $('input[name="daysInsured"]').val($(this).val());
    });

    $('.add_new_tourist .dropdown-menu a').on('click', function (e) {
        e.preventDefault();
        let touristAge = parseInt($(this).text());
        if (touristsArray.length <= 4) {
            touristsArray.push(touristAge);
            generateTouristsHtmlView();
        } else {
            alert(quantityAlert);
        }
        $('input[name="touristsCount"]').val(touristsArray.length)
        $('.tourists_count_number').text(touristsArray.length)
    });

    $('.add_new_tourist .dropdown-toggle').on('click', function () {
        var ageSelector = document.querySelector('.add_new_tourist .dropdown-menu');
        ageSelector.scrollTo({top: 875, behavior: 'smooth'})
    });

    $(document).on('click', '.travel_insured+.add_button button', function (e) {
        e.preventDefault();
        let insuredLength = $('.traveler_information .travel_one').length + 1;
        let deleteButton = '';
        let deleteClass = '';
        if (insuredLength > 1) {
            deleteButton = `<a href="#" class="delete_user_button" data-item="${insuredLength}"></a>`
            deleteClass = ' delete_user';
        }
        let template = `
            <div class="travel_one${deleteClass}" data-item="${insuredLength}">
                ${deleteButton}
                <div class="form_title">${insuredInfo} ${insuredLength} ${insuredTraveler}</div>
                    <div class="questions">${insuredQuestion}
                        <button type="button" class="information_button" 
                            data-bs-toggle="tooltip" data-bs-placement="right" 
                            data-bs-title="${insuredAnswer}">
                            <img src="assets/images/information-button.png" alt="">
                        </button>
                    </div>
                    <div class="travel_info additional">
                        <input type="text" required class="form-control latin_letter" pattern="[A-Za-z]{2,}(-?\\s?[A-Za-z]{1,})*" name="insured[${insuredLength}][first_name]" placeholder="First Name">
                        <input type="text" required class="form-control latin_letter" pattern="[A-Za-z]{2,}(-?\\s?[A-Za-z]{1,})*" name="insured[${insuredLength}][last_name]" placeholder="Last Name">
                        <input type="text" required class="form-control date_by_hand" pattern="\\d{2}\.\\d{2}\.\\d{4}" name="insured[${insuredLength}][birth_date]" placeholder="${insuredDob}">
                    </div>
            </div>
            <div class="travel_insured" data-item="${insuredLength}">
                <label class="input_check">
                    <input type="checkbox" name="insured[${insuredLength}][is_insurer]">${insuredIsInsurer}
                    <span class="checkmark"></span>
                </label>
            </div>
        `;

        if (insuredLength <= 5) {
            $(this).parent().before(template);
        } else {
            alert(quantityAlert);
        }
        $('[data-bs-toggle="tooltip"]').tooltip('enable');
        $('.date_by_hand').inputmask("99.99.9999");
    });

    $(document).on('click', '.Policyholder_data .add_button button', function (e) {
        e.preventDefault();
        let insuredEmailLength = $('.insurer-email').length + 1;
        let template = `<div class="additional_ins_email" data-item="${insuredEmailLength}">
            <input type="text" required
                   value=""
                   name="insurer[email][${insuredEmailLength}]"
                   class="insurer-email form-control"
                   placeholder="E-mail">
            <a href="#" class="delete_email_button" data-item="${insuredEmailLength}"></a>
            </div>`;

        $('.Policyholder_data .travel_info').append(template);
    });

    $(document).on('click', '.Policyholder_data .delete_email_button', function (e) {
        e.preventDefault();
        let dataItem = $(this).data('item');
        if (dataItem > 0) {
            $(`.additional_ins_email[data-item="${dataItem}"]`).remove();
            $(`input[type="hidden"][name="insurer[email][${dataItem}]"]`).remove();
        }
    });


    function generateTouristsHtmlView() {
        inputValueTemp = "";
        let selectedCount = $('.selected_count');
        selectedCount.html('');
        if (touristsArray.length > 0) {
            touristsArray.forEach(function (v, i) {
                let template = `
                <span class="selected_item">
                  ${i + 1} ${touristLabel}: ${v} ${touristAge}
                    <a href="#" class="delete_item" data-number="${i}">
                    <input type="hidden" name="touristsAge[${i}]" value="${v}">
                        <img src="assets/images/delete.png" alt="">
                    </a>
                </span>`;

                selectedCount.append(template);
                if (i < touristsArray.length - 1) {
                    inputValueTemp += (v + ',');
                } else {
                    inputValueTemp += v;
                }
            });
            inputValueTemp += touristCountLabel;
        }
        $("[name=tourists_count_text]").val(inputValueTemp);
    }

    $(document).on('click', '.delete_item', function (e) {
        let deletedIndex = $(this).data('number');
        touristsArray.splice(deletedIndex, 1);
        generateTouristsHtmlView();
        $('.tourists_count').addClass('show_select');
        $('.tourists_count_number').text(touristsArray.length);
        $('input[name="touristsCount"]').val(touristsArray.length);
        e.preventDefault();
        e.stopPropagation();
    });

    $(document).on('click', '.delete_user_button', function (e) {
        let dataItem = $(this).parent().data('item');
        $(this).parent().remove();
        $(`input[type="hidden"][name="insured[${dataItem}][first_name]"]`).remove();
        $(`input[type="hidden"][name="insured[${dataItem}][last_name]"]`).remove();
        $(`input[type="hidden"][name="insured[${dataItem}][birth_date]"]`).remove();
        $(`input[type="hidden"][name="touristsAge[${dataItem}]"]`).remove();
        $(`.travel_insured[data-item="${dataItem}"]`).remove();
        insuranceResultGet();
        e.preventDefault();
        e.stopPropagation();
    });

    /*$(document).on('change', '.date_by_hand', function (e) {
        let dob = $(this).val();
        let age = getAge(dob);
    });*/

    //$(document).on('change', '.additional .date_by_hand', function (e) {
    $(document).on('change', '.travel_one .date_by_hand', function (e) {
        insuranceResultGet();
        return false
    });

    $(document).on('change', 'input[name="checkSport"]', function (e) {
        calcForm.trigger('submit', {'checkSport': (e.target.checked ? 'on' : '')});
    });

    $(document).on('click', '.travel_insured input[type="checkbox"]', function (e) {
        let thisCheck = $(this);
        let item = thisCheck.parents('.travel_insured').data('item');
        let checked = thisCheck.is(':checked');
        let otherInputs = $('.travel_insured input[type="checkbox"]');

        if (checked) {
            otherInputs.not(this).prop('checked', false);
            let fname = $(`input[name="insured[${item}][first_name]"]`).val();
            let lname = $(`input[name="insured[${item}][last_name]"]`).val();
            let date = $(`input[name="insured[${item}][birth_date]"]`).val();

            $('input[name="insurer[first_name]"]').val(fname);
            $('input[name="insurer[last_name]"]').val(lname)
            $('input[name="insurer[dob]"]').val(date)
        } else {
            $('input[name="insurer[first_name]"]').val('');
            $('input[name="insurer[last_name]"]').val('')
            $('input[name="insurer[dob]"]').val('')
        }
    });

    calcForm.submit(function (event, data) {
        // let form = $(this);
        // let submit = true;
        // let inputs = form.find('input').not('[type=checkbox]').not('input[type="hidden"]');
        // let hiddenInputs = form.find('input[type="hidden"]');

        // inputs.each(function (i, v, a) {
        //     if ($(v).val() == '' || $(v).val() == null) {
        //         $(v).addClass('error');
        //         $('#insurance_result').html('');
        //     } else {
        //         $(v).removeClass('error');
        //     }
        // });
        // hiddenInputs.each(function (i, v, a) {
        //     if ($(v).val() == '' || $(v).val() == null || $(v).val() == '0') {
        //         submit = false;
        //     }
        // });

        // if (!submit) {
        //     $('#insurance_result').html('');
        //     return false;
        // }

        // requestData = form.serialize();
        // if (typeof data !== 'undefined') {
        //     requestData += `&checkSport=${data.checkSport}&step=recalc`;
        // }

        $('.buy_insurance').css('display','block')
        // $.ajax({
        //     type: 'post',
        //     data: requestData,
        //     url: '/ajax/handler.php',
        //     cache: false,
        //     dataType: 'json',
        //     beforeSend: function () {
        //     },
        //     success: function (response) {
        //         $('#insurance_result').html(response.html);
        //         $('[data-bs-toggle="tooltip"]').tooltip('enable');
        //         $('.date_by_hand').inputmask("99.99.9999");
        //         $('html, body').animate({
        //             scrollTop: $('#insurance_result').offset().top
        //         }, 200);
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });

        return false;
    });

    $(document).on('click', '.show_all', function (e) {
        e.preventDefault();
        $(this).css('display', 'none')
        $('.types_block').addClass('show');
    });
    $(document).on('click', '.country-item', function (e) {
        e.preventDefault();
        let country = $(this).data('id');
        setCookie('geoCountry', country, 1, '/');
        window.location.reload();
    });


    $('.latin_letter').bind('keyup',function(){
        $(this).val($(this).val().replace(/[^a-z ]/i, ""))
    });
});

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function insuranceResultGet() {
    let form = $('#insurance_result');
    requestData = form.serialize();
    requestData += '&step=recalc'
    $.ajax({
        type: 'post',
        data: requestData,
        url: '/ajax/handler.php',
        cache: false,
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (response) {
            $('#insurance_result').html(response.html);
            $('[data-bs-toggle="tooltip"]').tooltip('enable');
            $('.date_by_hand').inputmask("99.99.9999");
            $('html, body').animate({
                scrollTop: $('#insurance_result').offset().top
            }, 200);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
$(document).ready(function() {

	//Main Title Animation
	$('.plane-animation').addClass('animate');

	//Form Animation
	$('.search-form .search-form__field').on('click', function(){
		$(this).addClass('active');
	})

	$(document).mouseup(function (e) {
		var container = $(".search-form__field.active");

		if (e.target  != container [0] && container.has(e.target).length === 0 ){
			container.removeClass('active');
		}
	});

	//Date Picker
	$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#field-departure" )
        .datepicker({
          changeMonth: true,
          numberOfMonths: 1,
          minDate: new Date(),
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#field-return" ).datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(),
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  }); 

  //Clean Imput
  $('.clean-icon').on('click', function(){
  	$(this).siblings('input').val('');
  	$(this).addClass('hidden-icon');
  	$(this).siblings('select').val(null).trigger('change');
  });

  $('#search-form input').on('change', function(){
  	var curentInput = $(this).val(),
  			clearInput  = $(this).siblings('.clean-icon')
  	if( curentInput.length ) {
  		clearInput.removeClass('hidden-icon');
  	} else {
  		clearInput.addClass('hidden-icon');
  	}
  });

  //Form Select
	$('#field-from').select2({
		placeholder: "From",
		width: '100%'
	});

	$('#field-to').select2({
		placeholder: "To",
		width: '100%'
	});

	$('#field-from, #field-to').on('select2:select', function(){
  	var	clearInput  = $(this).siblings('.clean-icon')

  	clearInput.removeClass('hidden-icon');
	})


	function formData() {
		var dataObj = {
			'fromData': $('#field-from').val(),
			'toData': $('#field-to').val(),
			'departureDate': $('#field-departure').val(),
			'returnDate': $('#field-return').val()
		}

		return dataObj;
	}

	function createSearchItem (obj) {
		var themplate = $('.search-result-item-themplate').clone();

		//Generate Price
		var minPrice = 70,
				maxPrice = 150;

		var price = minPrice - 0.5 + Math.random() * (maxPrice - minPrice + 1)
    price = Math.round(price);

    //Class Fligth Array
		var fligthClass = ['Economy', 'Premium', 'Economy', 'Business', 'First'],
				maxFligthClassNumb = fligthClass.length;

		var fligthClassRendom = 0 - 0.5 + Math.random() * (maxFligthClassNumb - 0 + 1)
    fligthClassRendom = Math.round(fligthClassRendom);

    var fligthClassRendomVal = fligthClass[fligthClassRendom];

		//Remove Themplate Class and Hidden Class
		themplate.removeClass('search-result-item-themplate hidden');

		//Change 'From' Data
		themplate.find('.search-result-from .search-result-item__airport').text(obj.fromData);

		//Change 'To' Data
		themplate.find('.search-result-from-to .search-result-item__airport').text(obj.toData);

		//Change 'Date' Data
		themplate.find('.search-result-info__date strong').text(obj.departureDate);	

		//Change 'Price' Data
		themplate.find('.search-result-info__price').text(price + ' €');

		//Change 'Class' Data
		themplate.find('.search-result-info__class strong').text(fligthClassRendomVal);	

		return themplate;
	}


	//Function After Send Form
	function sucessForm() {
		var formObj = formData(),
				themplate = createSearchItem( formObj );

		$('.search-result').append( themplate );
	}

	// Send Form Data
	$("form").submit(function() {
		$.ajax({
			type: "POST",
			data: $("form").serialize(),
			success: function(){

				//Change Title
				$('.search-result-wrapper h2').text('Search Result');

				//Clear Search List
				$('.search-result .search-result-item').remove();

				for( var i = 0; i < 2; i++ ) {
					sucessForm();
				}
				minNumberData = 0;
				maxNumberData = 0.5;
				intervalId = setInterval(interval, 50);

			}
		});

		return false;
	});


	/* 
		==================================
    Start Flibgth Animation Functions
    ==================================
	*/
	var minNumberData = 0,
			maxNumberData = 0.5,
			element       = $('#fligth-info-animation')[0];

	// Information From Form To LocalStorage
	$('#field-from').on('change', function(){
		setData('from', $(this).val())
	});

	$('#field-to').on('change', function(){
		setData('to', $(this).val())
	});

	$('#field-departure').on('change', function(){
		setData('departureDate', $(this).val())
	});

	//Data Setter
	function setData (key, data) {
		localStorage.setItem(key, data);
	}

	//Data Getter
	function getData (key) {
		return localStorage.getItem(key);
	}

	//Flight Info Aniation
	function shuffle(str){
		var caps = str.toUpperCase();
		var char = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ/";
		for( var n = 0; n < caps.length; n++){
			calc = Math.floor(Math.random()*char.length);
			if(n == 0)element.innerHTML = (minNumberData >= 0) ? caps.charAt(0) : char.charAt(calc);
			if(n >= 1)element.innerHTML += (minNumberData >= 0 + n * 2) ? caps.charAt(n) : char.charAt(calc);
		}
		maxNumberData += 1 / (0 + caps.length * 2);
		minNumberData++;
	}

	//Compose Text Form Flight Info Aniation
	function composeText(){
		var from = getData('from'),
				to   = getData('to'),
				departureDate = getData('departureDate');

		return from + ' - ' + to + ' ' + departureDate;
	}



	var intervalId = null;
	var varCounter = 0;
	var textLength = composeText().length;

	//Interval Function
	var interval = function(){
		if($('#fligth-info-animation').text() !== composeText().toUpperCase() ) {
			shuffle( composeText() );
		} else {
			clearInterval(intervalId);
		}
	};
	
	/* 
		==================================
    End Flibgth Animation Functions
    ==================================
	*/
	
});







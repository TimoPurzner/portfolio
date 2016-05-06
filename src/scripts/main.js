$(document).ready(function() {
	// Create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item');

	// Scroll to main content
	$('#more').click(function() {
		var target = $(this).data("target");
		$('html, body').animate({
            scrollTop: $("#" + target).offset().top
        }, 1000);
		loadCard('home');
	});

	//Switch page item
	$(".ui.menu a.item").click(function(){
		if(!($(this).hasClass('active'))) {
			$(this).addClass('active')
				.siblings()
				.removeClass('active');
			loadCard($(this).data('target'));
		}
	});

	//For the Menu
	$('.masthead').visibility({
		once: false,
		onBottomPassed: function() {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse: function() {
			$('.fixed.menu').transition('fade out');
		}
	});

	// Finally load the initial page
	loadCard('home');
	
	//Animation after loding the img
	$('.image img')
	  .visibility({
		type       : 'image',
		transition : 'jiggle',
		duration   : 1000
	  });
	});


function loadCard(target) {
	$('#loader').toggleClass('active');
	$('#card').transition({
		animation	: 'horizontal flip',
		onComplete	: function(){
			$('#card').empty();
			$.ajax({
				async: true,
				method: 'get',
				dataType: 'html',
				url: 'cards/' + target + '.html',
			}).done(function (data) {
				$('#card').append(data);
			}).error(function () {
				$('#card').append('<div class="row"></div><div class="ui icon error message"><i class="warning sign icon"></i>' +
					'<div class="content"><div class="header">Das Element konnte leider nicht geladen werden</div>' +
					'<p>Versuchen Sie bitte die Seite neu zu laden oder melden Sie das dem Systemadministrator</p>' +
					'</div></div></div>');
			}).always(function () {
				$('#loader').toggleClass('active');
				$('#card').transition('horizontal flip');
				updateListeners();

				if (target === 'contactf') {
					$('.ui.form').form({
						fields: {
							fname: {
								identifier: 'sender[first-name]',
								rules: [
									'empty'
								]
							},
							kname: {
								identifier: 'sender[last-name]',
								rules: [
									'empty'
								]
							},
							email : {
								identifier: 'sender[email]',
								rules: [
									'empty',
									'email'
								]
							},
							message: 'empty'
						}
					});
				}
			});
		}
	});
}

function updateListeners() {
	$('.ui.dropdown').dropdown();
	$('.ui.checkbox').checkbox();
	$('.ui.embed').embed();

	$('.rating').rating({
		initialRating: $(this).data('rating'),
		maxRating: 5,
		interactive: false
	});

	$('.special.cards .image').dimmer({
		on: 'hover'
	});
};

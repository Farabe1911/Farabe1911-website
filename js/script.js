$(function(){
	"use strict";

	/*=========================================================================
		Initializing stellar.js Plugin
	=========================================================================*/
	$('.section').stellar({
		horizontalScrolling: false
	});
	
	
	$(window).on('load', function(){
	
		$('body').addClass('loaded');
	
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		var grid = $('#portfolio-grid');
		grid.shuffle({
			itemSelector: '.item'
		});
		
		$('#portfolio-filters > ul > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('#portfolio-filters > ul > li > a').removeClass('active');
			$(this).addClass('active');
			grid.shuffle('shuffle', groupName );
		});
		
		$('a.image-link').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			}
		});
	
	});
	
	
	
	/*=========================================================================
		Links Navigation System
	=========================================================================*/

	
	$(document).ready(function() {
		// Handle clicks on navigation links
		$('.front-person-links > ul > li > a[data-section]').on('click', function(e) {
			e.preventDefault(); // Prevent default anchor behavior
			var section = $('#' + $(this).data('section')); // Find the section using the data-section attribute
	
			if (section.length != 0) { // Check if the section exists
				$('body').addClass('section-show'); // Show the section
				section.addClass('active'); // Add 'active' class to the section
			}
		});
	
		// Handle clicks on the "Hire Me For Work" button
		$('#hire-me').on('click', function(e) {
			e.preventDefault(); // Prevent default anchor behavior
			var section = $('#contact'); // Target the Contact section
	
			if (section.length != 0) { // Check if the section exists
				$('body').addClass('section-show'); // Show the section
				section.addClass('active'); // Add 'active' class to the section
			}
		});
	
		// Handle clicks on the close button
		$('.close-btn').on('click', function() {
			$('body').removeClass('section-show'); // Hide the section
			$('section.active').removeClass('active'); // Remove 'active' class from the section
		});
	});
	

	/*=========================================================================
		Calculate experience
	=========================================================================*/


	function calculateExperience(startDate) {
		const today = new Date();
		const startDateObj = new Date(startDate);
		let experience = today.getFullYear() - startDateObj.getFullYear();
		const monthDifference = today.getMonth() - startDateObj.getMonth();
		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < startDateObj.getDate())) {
			experience--;
		}
		return experience;
	}

	const startDate = '2018-10-08'; // Change this to your birth date (YYYY-MM-DD)
	const experience = calculateExperience(startDate);
	document.getElementById('experience').textContent = experience + ' Years';







	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		singleItem: true
	});
	
	
	
	/*=========================================================================
		Skill Bar's Percent Initialization from attribute data-percent
	=========================================================================*/
	$('.skill-bar').each(function(){
		var $this = $(this),
			percent = parseInt( $this.data('percent'), 10 );
		
		$this.find('.bar').css('width', percent + '%');
	});
	
	
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {
		
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			
			e.preventDefault();
			var $this = $(this),
				
				//You can edit alerts here
				alerts = {
				
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success alert-dismissible' role='alert'> \
							<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
								<i class='ion-ios-close-empty' ></i> \
							</button> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					
					
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger alert-dismissible' role='alert'> \
							<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
								<i class='ion-ios-close-empty' ></i> \
							</button> \
							<strong>Error!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
					
				};
			
			$.ajax({
			
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					
					if( isJSON(data) ){
						
						data = $.parseJSON(data);
						
						if(data['error'] == false){
							
							$('#contact-form-result').html(alerts.success);
							
							$('#contact-form').trigger('reset');
							
						}else{
							
							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
							
						}
						
						
					}else{
						$('#contact-form-result').html(alerts.error);
					}
					
				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
	
});
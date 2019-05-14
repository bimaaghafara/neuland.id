$(document).ready(function(){

	if ($('input[type=radio]').length>0){
		$('input[type=radio]').click(function(){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked').prop('checked',false);
				if($('#refer-desc').length>0){
					$('#refer-desc').attr('placeholder', '').prop('readonly', true);
				}
			} 
			else{
				$(this).prop('checked',true).addClass('checked');
				
			}
    	});
	}
	
	if( $('.dob').length != 0 ){
		for (i=1; i<=31; i++){
			var date = date+'<option value="'+i+'">'+i+'</option>';
		}
		$('.dob .day').html('<option>DD</option>'+date);

		for (i=1; i<=12; i++){
			var month = month+'<option value="'+i+'">'+i+'</option>';
		}
		$('.dob .month').html('<option>MM</option>'+month);
		for (i=1950; i<=1999; i++){
			var year = year+'<option value="'+i+'">'+i+'</option>';
		}
		$('.dob .year').html('<option>YYYY</option>'+year);
	}

	if( $('iframe').length != 0 ){
		var $src=$('iframe').attr('src')+'?showinfo=0&rel=0';
		//console.log($src);
		$("iframe").attr("src",$src);
	}
	
	if( $('.slick-top-container').length != 0 ){
		//slick-top-container
		jQuery('.video-slider').slick({
			infinite: true,
			dots: true,
			prevArrow: $('.prev'),
			nextArrow: $('.next'),
		});

		// On before slide change
		// jQuery('.video-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 	// console.log(nextSlide);
		// 	var $current = jQuery('.slick-current');
		// 	$current.find('.video-slider-wrapper-player').hide().empty();
		// 	$current.find('.video-slider-wrapper-cover').fadeIn();
		// 	// jQuery('.video-slider').find('.btn-play-video').show();
		// 	jQuery('.slick-top-container').find('.neulandIs').show();
		// 	jQuery('.slick-top-container').find('.slick-dots').show();
		// 	jQuery('.video-slider').slick('slickPlay');
		// });

	}

	//tab
	$('.collapse')
		.on('shown.bs.collapse', function(){
			$(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");})
		.on('shown.bs.collapse', function(){
			$(this).parent().find(".panel-heading").addClass("active");})
		.on('hidden.bs.collapse', function(){
			$(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");})
		.on('hidden.bs.collapse', function(){
			$(this).parent().find(".panel-heading").removeClass("active");});

	if( $('.challenge-switch-wrap').length != 0 ){

		function neuSwitchChallenge(){
			$('.challenge-item').css( 'height',   $('.challenge-item.center').width() + 'px' );
			var centerWrap, centerCircle, leftWrap, leftCircle, rightWrap, rightCircle;
			centerWrap = $( '.challenge-item.center' );
			leftWrap = $('.challenge-item.left');
			rightWrap = $('.challenge-item.right');

			$('body').on('click', '.circle-item-in-mid', function(){
				var dataPost = $(this).parent().parent().parent().data('position');
				var giant = $(this).attr('data-giant');
				var challenge = $(this).attr('data-challenge');
				var link = $(this).attr('data-link');

				// console.log( dataPost );
				centerCircle = $('.challenge-item.center .circle-item');
				
				if( 'left' == dataPost ){
					leftCircle = $(this).parent().parent();
					// console.log( leftCircle.offset() );
					$(this).parent().parent().parent().hide().fadeIn().html(centerCircle);
					$('.challenge-item.center').hide().fadeIn().html(leftCircle);
				}
				if( 'right' == dataPost ){
					rightCircle = $(this).parent().parent();
					// console.log( rightCircle.offset() );
					$(this).parent().parent().parent().hide().fadeIn().html(centerCircle);
					$('.challenge-item.center').hide().fadeIn().html(rightCircle);
				}

				$('.cat-challenge').text( challenge );
				$('.giant-challenge').text( giant );
				$('.submit-now a:not(.neu-login)').attr('href', link );
			})

		}

		neuSwitchChallenge();

		$(window).on('resize', function(){
			$('.challenge-item').css( 'height',   $('.challenge-item.center').width() + 'px' );
		})

	}

	/*
	 * description text area left characters
	 */
	// if( $('.description_textarea').length != 0 ){
	// 	/*
	// 	* display count character type in textarea description
	// 	*/
	// 	function CharTextarea(){
	// 		var maxChar = 350;
	// 		var textAreaDesc = $('.description_textarea');
	// 		var lengthLeft = $('.length-left');

	// 		lengthLeft.html( textAreaDesc.val().length );
			
	// 		textAreaDesc.on('keyup', function(){
	// 			if( $(this).val().length > maxChar ){
	// 				return false;
	// 			}
	// 			lengthLeft.html( $(this).val().length );
	// 		})
	// 	}
	// 	CharTextarea();
	// }

	/**
	 * Play Video (pop up fullscreen video)
	 **/
	$('.play-video').on('click', function(e) {
		e.preventDefault();
		var $video = $(this).attr('data-video');
		var $html  = '<video id="my-video" class="video-js" autoplay controls preload="auto" data-setup="{}" controlsList="nodownload">'
			$html +=   	'<source src="' + $video + '" type="video/mp4">';
			$html +=    '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>';
			$html += '</video>';
		$('.video-player .video-wrapper').empty().html($html);
		$('.video-player').fadeIn();

		$('body').addClass('neu-modal-video-open'); // for handling disable scroll body
	});

	/**
	 * Close Video
	 **/
	$('.close, .video-player').on('click', function(e) {
		e.preventDefault();
		if( e.target.id == 'my-video' ){return false;}
		$('.video-player').fadeOut("fast");
		$('.video-player .video-wrapper').empty();
		$('body').removeClass('neu-modal-video-open');
	});

	/*
     * readURLimg
     * read url of input file image
     * for previewing image 
     */
    function readURLimg( input, eq, imgPreview ){
        // console.log( eq );
        if( input.files && input.files[0]){
            var reader = new FileReader();

            reader.onload = function(e){
                imgPreview.eq(eq).attr('src', e.target.result );
                // $('.neu-upload-cover-image img.img-cover-preview').eq(eq).attr('src', e.target.result );
                
                // $('.cm-upload-del').eq(eq).show();
                // $('.cm-uploader label').eq(eq).hide();
                // $('.cm-preview-wrapper').eq(eq).css('min-height', 100+'px');
                // $('.cm-preview-wrapper').eq(eq).css('height', 100+'px');
            }
            reader.readAsDataURL( input.files[0] );
        }
    }
	
	/*
	 * add more input file (file submission)
	 */
    if( $('.file-submit-wrap').length !== 0 ){
    	var lWrap = 1;
		$('body').on('click','.btn-add-more-file', function(e){
			e.preventDefault();
			lWrap++;
			var elClone = $('.file-submit-wrap').eq(0).clone();	
			$('.row-submit-input').hide().fadeIn().append( elClone );
			var newID = 'neu-file-upload-'+lWrap;
			var newText = 'Upload '+lWrap;
			$('.file-submit-wrap label').eq(lWrap-1)
								.attr('for', newID );
			$('.file-submit-wrap .left').eq(lWrap-1)
								.text( newText );
			$('.file-submit-wrap input').eq(lWrap-1)
								.attr('name', newID )
								.attr('id', newID);


			if( lWrap == 3 ){
				$('.btn-add-more-file').hide();
			}
		})
    }

    $('.neu-file-upload.sound').change( function(){
    	var thisFileSize = this.files[0].size/1024/1024;
  		var ind = $('.neu-file-upload.sound').index(this);
  		if( thisFileSize > 5 ){
  			$('.error-file-valid').eq(ind).show();
  			$('.neu-file-upload.sound').eq(ind).val("");
  		}
    })

    $('.neu-file-upload.taste').change( function(){
    	var thisFileSize = this.files[0].size/1024/1024;
  		var ind = $('.neu-file-upload.taste').index(this);
  		if( thisFileSize > 50 ){
  			$('.error-file-valid').eq(ind).show();
  			$('.neu-file-upload.taste').eq(ind).val("");
  		}
    })

    $('.neu-file-upload.vision').change( function(){
    	var thisFileSize = this.files[0].size/1024/1024;
  		var ind = $('.neu-file-upload.vision').index(this);
  		if( thisFileSize > 50 ){
  			$('.error-file-valid').eq(ind).show();
  			$('.neu-file-upload.vision').eq(ind).val("");
  		}
    })

	// validation challenge submit
	$('form[name="form-challenge"]').on('submit', function(e){
		e.preventDefault();
		// $('.project-title-error')
		var projectTitle = $('#neu-project-title').val();

		if( projectTitle == '' ){
			$('.project-title-error').show();
			$('html, body').animate({scrollTop: $("#neu-project-title").offset().top-200});
		}

		$('.neu-file-upload').each(function(i){
			var fileUpload = $(this);
			if( fileUpload.get(0).files.length === 0 ){
				// console.log( i + 'kosong' );
				$('.error-file-empty').eq(i).text('Please Select your file..');
			}
		})
	})

	/*	
	 * preview user photo in profile user page
	 */
	if( $('#neu-profile-user-photo-file').length != 0 ){
		$('#neu-profile-user-photo-file').change( function(){
			readURLimg( this, $('#neu-profile-user-photo-file').index(this), $('.neu-profile-user-photo-wrap img.neu-profile-user-img') );
			
			var imgUser = $('.neu-profile-user-img');
			$('.neu-profile-user-img').load( function(){
				$(this).width();
			});
		})
	}
	
	//slider
	//slider-center
	if( $('.slick-center').length != 0 ){
		$('.slick-center').slick({
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 3,
			dots: false,
			arrow: false,
			infinite: false,
			initialSlide: 1,
			responsive:[
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						dots: true,
						initialSlide: 1,
					}
			    },
			    {
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						centerMode: true,
						dots: true,
						initialSlide: 1,
					}
			    },
			]
		})
		$('.slick-center').on('breakpoint', function (event, slick, currentSlide, nextSlide) {
			console.log(currentSlide);
		});

	}


	// video player
	if( $('.neu-media-player').length != 0 ){
		
		function neuVideoPlayer(){
			$('.neu-media-player').each( function( i ){
				
				var video = $('.neu-media-player-video').eq(i),
					playButton = $('.play-video-button').eq(i),
					progressContainer = $('.neu-media-player-control-progress').eq(i),
					progressBox 	= $('.video-progress-box').eq(i),
					progressPlay 	= $('.video-progress-play').eq(i),
					progressBuffer 	= $('.video-progress-buffer').eq(i),
					videoVolume		= $('.video-volume').eq(i),
					videoVolumeBar 	= $('.video-volume-bar').eq(i),
					videoFullscreen	= $('.video-fullscreen').eq(i);

				playButton.on('click', function(){
					if( video[0].paused ){
						video[0].play();
						playButton.fadeOut();
					}
					return false;
				});	

				videoFullscreen.on('click', function(e) {
					e.preventDefault();
					var $video = $(this).attr('data-video');
					var $html  = '<video id="my-video" class="video-js" autoplay controls preload="auto" data-setup="{}" controlsList="nodownload">'
						$html +=   	'<source src="' + $video + '" type="video/mp4">';
						$html +=    '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>';
						$html += '</video>';
					$('.video-player .video-wrapper').empty().html($html);
					$('.video-player').fadeIn();

					$('body').addClass('neu-modal-video-open'); // for handling disable scroll body
				});


				video.on('click', function(){
					if( video[0].play ){
						playButton.fadeIn();
						video[0].pause();
					}else{
						playButton.fadeOut();
						video[0].play();
					}
					return false;
				});

				video.on('loadedmetadata', function(){
					// console.log( "loadedmetadata" );
					// console.log( video[0].duration );
					// $('.duration-time').text( formatSeconds( video[0].duration ) );
				})
				video.on( 'timeupdate', function(){
					// $('.duration-time').text( formatSeconds( video[0].duration ) );
					var currentPos = video[0].currentTime;
					var maxDuration = video[0].duration;
					var percentage = 100 * currentPos / maxDuration;

					progressPlay.css('width', percentage + '%' );

					// $('.current-time').text( formatSeconds( video[0].currentTime ) );

					if( video[0].currentTime === video[0].duration ){
						playButton.show();
					}
				});
				videoVolume.on('mousedown', function(e){
					var position = e.pageX - videoVolumeBar.offset().left;
				    var percentage = 100 * position / videoVolumeBar.width();
				    if( percentage > 100 ){
						percentage = 100;
					}
					if( percentage < 0 ){
						percentage = 0;
					}
				    videoVolumeBar.css('width', percentage+'%');
				    video[0].volume = percentage / 100;
				});

				var timeDrag = false; 
				progressBox.mousedown( function( e ) {
					timeDrag = true;
					updateBar( e.pageX );
				});
				progressBox.mouseup( function( e ){
					if( timeDrag ){
						timeDrag = false;
						updateBar( e.pageX );
					}
				});
				$(document).mousemove( function( e ){
					if( timeDrag ){
						updateBar( e.pageX );
					}
				})

				var updateBar = function( x ){
					var progress = $('.video-progress-box');
					var maxDur = video[0].duration;
					var position = x- progress.offset().left;
					var percentage = 100 * position / progress.width();

					if( percentage > 100 ){
						percentage = 100;
					}
					if( percentage < 0 ){
						percentage = 0;
					}
					progressPlay.css( 'width', percentage + '%' );
					video[0].currentTime = maxDur * percentage / 100;
				}
				var startBuffer = function(){
					var maxDur = video[0].duration;
					var currentBuffer = video[0].buffered.end(0);
					var percentage = 100 * currentBuffer / maxDur;
					progressBuffer.css( 'width', percentage + '%' );

					if( currentBuffer < maxDur ){
						setTimeout( startBuffer, 500 );
					}
				}
				setTimeout(startBuffer, 500);
			})
		}

		neuVideoPlayer();

		// disable right click
		$('.neu-media-player').bind('contextmenu', function(e){
			e.preventDefault();
		})

		function formatSeconds(seconds){
			  var date = new Date(1970,0,1);
			  date.setSeconds(seconds);
			  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		}
	}

	$('.video-wrapper').bind('contextmenu', function(e) {
	    return false;
	}); 


	var clickCount = 0;
	// simulation load more neuland page
	$('.btn-load-more').on('click', function(){
		clickCount++;
		$.ajax({
			url: "../assets/js/load-more.html", 
			success: function(result){
				$(result).hide().appendTo('.neu-container-article').fadeIn(1000);
				if( clickCount == 2 ){
					$('.load-more').hide();
				}
				neuVideoPlayer(); // reInit
		    }
		})
	})



	if( $('form[name="form-login"]').length !== 0 ){
		// login validation: 
		$('form[name="form-login"]').validate({
			rules:{
				email: {
					required: true,
					email: true	
				},
				pwd: {
					required: true,
					minlength: 8,
				}
			},
			messsages: {
				email: "Please enter a valid email address",
				pwd: {
					required: "Please provide a password",
					minlength: "Your Password must be at least 8 characters long"
				}
			},
			submitHandler: function(form){
				form.submit();
			}

		})

		$('form[name="form_register_1"]').validate({
			ignore: ".ignore",
			rules:{
				emailreg:{
					required: true,
					email: true,
				},
				pwdreg: {
					required: true,
					minlength: 8,
				},
				confirmpwd: {
					required: true,
					minlength: 8,
					equalTo:'#pwdreg'
				},
				fullnamereg: {
					required: true, 
				},
				optradiogender:{
					required: true,
				},
				idnnumberreg:{
					required: true,
				},
				select_city_reg:{
					required: true,
				},
				referral: {
					required: true,
				},
				optradioagree_1:{
					required: true,
				},
				optradioagree_2:{
					required: true,
				}, 
				referdesc:{
					required: true,
				},
				phone_reg:{
					required: true,
				},
				instagram_reg:{
					required: true,
				},
				facebook_reg:{
					required: true,
				},
				twitter_reg:{
					required: true,
				}
			},
			messsages:{
				emailreg: "Please enter a valid email address",
				pwd: {
					required: "Please provide a password",
					minlength: "Your Password must be at least 8 characters long"
				},
				confirmpwd: {
					required: "Please provide a password",
					minlength: "Your Password must be at least 8 characters long"	
				},
				fullnamereg: "Please enter your fullname",
				optradiogender: "Please select your gender",
				idnnumberreg: "Please enter your ID Number",
				select_city_reg: "Please select your city",
				referral: "Please select your referral",
				referdesc: "Please enter your referral",
				optradioagree_1: "",
				optradioagree_2: "",
				// dateofbirth: "Select your date of birth",
				phone_reg: "Please enter your phone number",
				instagram_reg: "Please enter your instagram account url",
				facebook_reg: "Please enter your facebook account url",
				twitter_reg: "Please enter your twitter account url",
			},
			submitHandler: function( form ){
				form.submit();
			}
		});
		// $('.btn-register-next').on('click', function( e ){
		// 	if ($('form[name="form_register_1"]').valid() == true ){
		// 		$('#register-body-2').show();
		// 		$('#register-body-1').hide();
		// 	}
		// });
		$('.btn-sign-up').on('click', function(e ){
			e.preventDefault();
			if ($('form[name="form_register_1"]').valid() == true ){
				$('#modal-confirmation-reg').modal('show');
			}
		});
	}
	
	// modal for login & register
	$('.neu-login').on('click', function(e){
		e.preventDefault();
		$('#login-body').show();
		$('#register-body-1').hide();
		$('#register-body-2').hide();
		$('.modal-header .right').removeClass('active'); 
		$('.modal-header .left').addClass('active');
	});

	$('.neu-register').on('click', function(e){
		e.preventDefault();
		$('#register-body-1').show();
		$('#login-body').hide();
		$('#register-body-2').hide();  
		$('.modal-header .left').removeClass('active'); 
		$('.modal-header .right').addClass('active');
	});

	// form register referral
	$('#referral-by-email').on('click', function(){
		if($(this).is(':checked')){ 
			$('#refer-desc').attr('placeholder', "Input your friend's email").prop('readonly', false);
		}
	})
	$('#referral-by-id').on('click', function(){
		if( $(this).is(':checked') ){ 
			$('#refer-desc').attr('placeholder', "Input your friend's Referral ID").prop('readonly', false);
		}
	})
	// dismiss stack modal
	$('body').on('hide.bs.modal', '.modal-confirmation-reg', function () {
	    setTimeout(function(){
	        $('body').addClass('modal-open');
	    }, 500);
	});

	// text disclaimer register
	$('.register-disclaimer').on('click', function(e){
		e.preventDefault();
		$('.register-disclaimer-text').toggle();
	})
});
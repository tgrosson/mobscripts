/* eslint-env es6 */
"use strict";

$.fn.isFormatted = function(tag) {
	var cursorLoc = $(this).prop('selectionStart')
	var prevText = $(this).val().substr(0,cursorLoc)
	
	var lastOpen = prevText.lastIndexOf('<'+tag+'>');
	var lastClose = prevText.lastIndexOf('</'+tag+'>');
	if(lastOpen>lastClose) {
		return true;
	} else {
		return false;
	}
}

$.fn.appendText = function(text2add) {
	$(this).val(function() {
		return $(this).val() + text2add;
	})
	
	//Scroll script area to bottom on update
	$(this).scrollTop($(this)[0].scrollHeight);
} 

$.fn.insertText = function(text2ins) {
	var cursorLoc = $(this).prop('selectionStart');
	var text = $(this).val();
	var front = text.substr(0,cursorLoc);
	var back = text.substr(cursorLoc);
	
	$(this).val(front+text2ins+back);
	
	//Keep cursor where it was
	var pos = cursorLoc + text2ins.length;
	$(this)[0].setSelectionRange(pos,pos);
//	var range = $(this).createTextRange();
//	range.collapse(true);
//	range.moveEnd('character', pos);
//	range.moveStart('character', pos);
//	range.select();
}

$( function() {
	//Cancel buttons hide parent modal on click
	$('.close').click(function() {
		$(this).parents('.modal').hide();
	})
	
	//Immediately set all formatting options to off
//	$(".formattable").resetFormat();
	
	//Pressing 'Enter' clicks the .submit button of the active modal
	$(".modal-content").keydown(function(e) {
		if(e.key === 'Enter') {
			e.preventDefault();
			$(this).find('.submit').click();
		}
	})
	
	//Creates <u></u> tags
	$(".formattable").keydown(function(e) {
		if(e.ctrlKey && e.key === 'u') {
			e.preventDefault();
			if($(this).isFormatted('u')) {
				$(this).insertText('</u>');
			} else {
				$(this).insertText('<u>');
			}
		}
	});
	
	//Creates <i></i> tags
	$(".formattable").keydown(function(e) {
		if(e.ctrlKey && e.key === 'i') {
			e.preventDefault();
			if($(this).isFormatted('i')) {
				$(this).appendText('</i>');
			} else {
				$(this).appendText('<i>');
			}
		}
	});
	
	//Creates <b></b> tags
	$(".formattable").keydown(function(e) {
		if(e.ctrlKey && e.key === 'b') {
			e.preventDefault();
			if($(this).isFormatted('b')) {
				$(this).appendText('</b>');
			} else {
				$(this).appendText('<b>');
			}
		}
	});
	
	
	//HTML reset buttons hide the html container
	$('#code-containers').children('.hidden-code').on("reset",function() {
		$(this).hide();
	});
});


function createNewYear() {
	var year = window.prompt('Enter a year');
	
	if(year.length > 0) {
		var text2add = '<a href=\"#\" onclick=\"return show(\'' + year + '\',\'year\');\">' + year + '</a>\n\n';

		text2add += '<div class=\"year\" id=\"' + year + '\">\n';
		text2add += '\t<table>\n';
		text2add += '\t<tbody><tr>\n\t\t\n';
		text2add += '\t</tr>\n\t</tbody></table>\n</div>';
		
		$('#new-year-container').show();
		$('#new-year-html').appendText(text2add);
	}
}

function createShow() {
	var text2add = '<div class=\"script\" id=\"' + $('#script-id').val() + '\">\n';
	
	var oppon = $('#opponent').val();
	var home = $('#home:checked').val();
	var away = $('#away:checked').val();
	
	if(home) {
		text2add += '\t<h3>' + oppon + ' vs. Rice' + '</h3>\n';
	} else if (away) {
		text2add += '\t<h3>' + 'Rice vs. ' + oppon + '</h3>\n';
	}
	
	var stadium = $('#stadium').val();
	var location = $('#location').val();
	var date = $('#date').val()
	var hasStadium = stadium.length > 0;
	var hasLocation = location.length > 0;
	var hasDate = date.length > 0;
	
	text2add += '\t<h5><i>'
	if(hasStadium) {
		text2add += stadium;
		if(hasLocation) {
			text2add += ' &mdash; ';
		}
	}
	if(hasLocation) {
		text2add += location;
	}
	if((hasLocation || hasStadium) && hasDate) {
		text2add += '<br>';
	}
	if(hasDate) {
		text2add += date;
	}
	text2add += '</i></h5>\n';
	
	var gameResult = $('[name="result"]:checked').val();
	var score1 = $('#score1').val();
	var score2 = $('#score2').val();
	
	if(gameResult) {
		text2add += '\t<p>' + 'Result: ' + gameResult + ' ' + score1 + '&mdash;' + score2 + '</p>\n'
	}
	
	$('#script-html').appendText(text2add);
	
	$('#show-builder-modal').hide();
}

function addTitle() {
	var title = $('#title').val();
	var text2add = '';
	
	if(title.length > 0) {
		text2add = '\t<h4>' + title + '</h4>\n';
	}
	
	text2add += '\t<table><tbody>\n';
	
	$('#script-html').appendText(text2add);
	
	$('#title-modal').hide();
}

function addLine() {
	var text2add = '\t<tr>\n\t\t<td class=\"left\">';
	
	var actor = $('[name="actor"]:checked').val();
	
	if(actor !== 'other' && actor !== undefined) {
		text2add += actor + ':';
	} else {
		var other = $('#other-field').val();
		if(other.length > 0) {
			text2add += other + ':';
		}
	}
	text2add += '</td>\n\t\t<td>';
	
	var what = $('#what').val();
	
	if(actor==='Formation' && $('#spellout').is(':checked')) {
		text2add += '<b>' + what + '</b>';
	} else if(actor === 'Music' || actor === 'Action' || actor === 'MOB') {
		text2add += '<i>' + what + '</i>';
	} else {
		text2add += what;
	}
	
	text2add += '</td>\n\t</tr>\n';

	$('#script-html').appendText(text2add);
	
	$('#line-modal').hide();
	$('#line-form').trigger('reset');
}

function newSegment() {
	var scriptText = $('#script-html').val();
	var loc = scriptText.lastIndexOf('<tr');
	var firstHalf = scriptText.substring(0,loc+3);
	var secondHalf = scriptText.substring(loc+3);
	
	var newText = firstHalf + ' class=\"bot\"' + secondHalf;
	$('#script-html').val(newText);
}

function addEpilogue() {
	var epilogue = $('#epilogue').val();
	
	var text2add = '\t<tr class=\"epilogue\">\n';
	text2add += '\t\t<td class=\"left\">Epilogue:</td>\n';
	text2add += '\t\t<td><i>' + epilogue + '</i></td>\n';
	text2add += '\t</tr>\n';
	
	$('#script-html').appendText(text2add);
	
	$('#epilogue-modal').hide();
}

function closeTitle() {
	$('#script-html').appendText('\t</tbody></table>\n');
}

function finalize() {
	$('#script-html').appendText('</div>\n');
}

function createShowLink() {
	var text2add = '<td class=\"title\"><a href=\"#\" onclick=\"return show(\'' + $('#script-id').val() + '\',\'script\');\">';
	
	var title = $('#link-title').val();
	var oppon = $('#opponent-short').val();
	
	if(title.length > 0) {
		text2add += title + '</a><br>';
	}
	if($('#away:checked').val()) {
		text2add += '@ ';
	}
	if(oppon.length > 0) {
		text2add += oppon + ', ';
	}
	text2add += $('#date-short').val();
	if(title.length === 0) {
		text2add += '</a>';
	}
	text2add += '</td>';
	
	$('#script-link-container').show();
	$('#script-link-html').appendText(text2add);
	
	$('#show-link-modal').hide();
}

function previewScript() {
	$('#script-preview').contents().find('#preview-container').html($('#script-html').val());
}

function clearAll() {
	$('form').trigger('reset');
}